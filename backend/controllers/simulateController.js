const fs = require('fs');
const path = require('path');
const csv = require('csv-parse');
const SimulationHistory = require('../models/SimulationHistory');
const dayjs = require('dayjs');

// Simple rule-based simulation based on eventType and params
function runSimulation(eventType, rows) {
  // rows: parsed CSV rows (array)
  const total = rows.length;
  let revenueDrop = 0;
  let workloadIncrease = 0;
  let trustDrop = 0;
  let insight = '';

  switch (eventType) {
    case 'churn':
      revenueDrop = Math.min(30, Math.round(total * 0.02));
      workloadIncrease = Math.min(20, Math.round(total * 0.015));
      trustDrop = Math.min(15, Math.round(total * 0.01));
      insight = 'Higher churn observed among recently onboarded users.';
      break;
    case 'downtime':
      revenueDrop = Math.min(50, Math.round(total * 0.03));
      workloadIncrease = Math.min(40, Math.round(total * 0.025));
      trustDrop = Math.min(25, Math.round(total * 0.02));
      insight = 'Downtime causes transaction failures and support spikes.';
      break;
    case 'compliance':
      revenueDrop = Math.min(20, Math.round(total * 0.01));
      workloadIncrease = Math.min(30, Math.round(total * 0.02));
      trustDrop = Math.min(35, Math.round(total * 0.03));
      insight = 'Compliance issues create manual reviews and delays.';
      break;
    default:
      revenueDrop = 5;
      workloadIncrease = 5;
      trustDrop = 2;
      insight = 'Generic simulation.';
  }

  const riskLevel = revenueDrop + workloadIncrease + trustDrop > 50 ? 'High' : 'Medium';

  return { revenueDrop, workloadIncrease, trustDrop, insight, riskLevel, total };
}

exports.uploadAndSimulate = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'CSV file required' });
    const eventType = req.body.eventType || 'churn';
    const filePath = req.file.path;
    const content = fs.readFileSync(filePath);
    csv.parse(content, { columns: true }, async (err, records) => {
      if (err) return res.status(400).json({ message: 'CSV parse error', err: err.message });
      const result = runSimulation(eventType, records);
      const history = new SimulationHistory({
        userId: req.user._id,
        simulationName: req.body.simulationName || `Sim ${dayjs().format()}`,
        riskLevel: result.riskLevel,
        fileName: req.file.originalname,
        totalTransactions: result.total,
        suspiciousItems: 0,
        eventType,
        result,
      });
      await history.save();
      res.json({ history, result });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Store last simulation per user in-memory for quick QA (simple, reset on restart)
const lastSimByUser = new Map();

exports.storeLastSim = (userId, history) => {
  lastSimByUser.set(String(userId), history);
};

exports.ask = async (req, res) => {
  const { question } = req.body;
  const userId = String(req.user._id);
  // Find last simulation or user's history
  let context = lastSimByUser.get(userId);
  if (!context) {
    context = await SimulationHistory.findOne({ userId }).sort({ createdAt: -1 }).lean();
  }
  if (!context) return res.status(404).json({ message: 'No simulation context available' });

  // Keyword-based event type detection
  const q = (question || '').toLowerCase();
  let detected = context.eventType || 'churn';
  if (q.includes('downtime')) detected = 'downtime';
  if (q.includes('churn')) detected = 'churn';
  if (q.includes('compliance')) detected = 'compliance';

  // Extract numeric percent if present
  const percentMatch = q.match(/(\d{1,3})%/);
  let percent = percentMatch ? Number(percentMatch[1]) : null;

  // Build response using simple proportional logic
  const base = context.result || context;
  const baseVals = base.result || base;
  let revenue = baseVals.revenueDrop || 5;
  let workload = baseVals.workloadIncrease || 5;
  let trust = baseVals.trustDrop || 2;

  if (percent !== null) {
    // scale linearly: percent/100 * base
    revenue = Math.round((percent / 100) * revenue * 1);
    workload = Math.round((percent / 100) * workload * 1.2);
    trust = Math.round((percent / 100) * trust * 0.8);
  }

  const suggestion = detected === 'downtime' ? 'Improve reliability measures and monitoring.' : detected === 'churn' ? 'Enhance retention programs and onboarding.' : 'Review policies and automate compliance checks.';

  const answer = `📊 ${detected.charAt(0).toUpperCase() + detected.slice(1)} impact: revenueDrop ~${revenue}%, workloadIncrease ~${workload}%, trustDrop ~${trust}%. Suggested Action: ${suggestion}`;

  res.json({ answer, detected, percent });
};

// Simple endpoint to resume/re-run a historical simulation by id (used in historyController as well)
exports.runSimulationFromHistory = async (history) => {
  const records = [];
  for (let i = 0; i < (history.totalTransactions || 10); i++) records.push({});
  const result = runSimulation(history.eventType || 'churn', records);
  return result;
};
