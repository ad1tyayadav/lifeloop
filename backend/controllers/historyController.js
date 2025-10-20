const SimulationHistory = require('../models/SimulationHistory');
const simulateCtrl = require('./simulateController');
const exportCtrl = require('./exportController');

exports.list = async (req, res) => {
  try {
    const items = await SimulationHistory.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const item = await SimulationHistory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resume = async (req, res) => {
  try {
    const item = await SimulationHistory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const result = await simulateCtrl.runSimulationFromHistory(item);
    item.result = result;
    item.riskLevel = result.riskLevel;
    await item.save();
    res.json({ item, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.download = async (req, res) => {
  try {
    const item = await SimulationHistory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    // delegate to export controller
    await exportCtrl.generatePdfAndSend(item, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
