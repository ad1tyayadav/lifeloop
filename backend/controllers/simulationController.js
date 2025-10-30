const db = require('../models/db');
const { parseCsvBuffer, summarize } = require('../utils/csvHelper');
const { storeBuffer } = require('../utils/localStorage');
const { orchestrate } = require('../agents/orchestrator');
const { zipFiles } = require('../utils/zipUtil');
const path = require('path');
const fs = require('fs');

async function simulate(req, res) {
  try {
    const user = req.user;
    const { title, event_type, question } = req.body;
    if (!req.file) return res.status(400).json({ error: 'CSV file required (field name "file")' });

    const file = req.file; // multer
    const stored = storeBuffer(file.originalname, file.buffer);

    // save file record
    const infoFile = db.run('INSERT INTO files (simulation_id, filename, path) VALUES (?, ?, ?)', [null, stored.filename, stored.path]);

    const records = parseCsvBuffer(file.buffer);
    const summary = summarize(records);

    // run orchestrator with simple extracted inputs from CSV sample or provided body
    const data = Object.assign({}, req.body, { data: req.body });
    const report = orchestrate({ event_type, data: req.body });

    const result_json = JSON.stringify(report);

    const sim = db.run('INSERT INTO simulations (user_id, title, event_type, csv_filename, input_summary, result_json) VALUES (?, ?, ?, ?, ?, ?)', [user.id, title || 'Untitled', event_type || 'generic', stored.filename, JSON.stringify(summary), result_json]);
    const simId = sim.lastInsertRowid;

    // update file with simulation_id
    db.run('UPDATE files SET simulation_id = ? WHERE id = ?', [simId, infoFile.lastInsertRowid]);

    // add history entry
    const agent_responses = JSON.stringify(report.perAgent || []);
    db.run('INSERT INTO simulation_history (simulation_id, question, agent_responses, result_snapshot) VALUES (?, ?, ?, ?)', [simId, question || null, agent_responses, result_json]);

    // Build graph data from history (single snapshot)
    const graph_data = {
      revenue: [report.revenue_drop],
      workload: [report.workload_change],
      trust: [report.trust_drop]
    };

    res.json({ id: simId, result: report, graph_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

function history(req, res) {
  const user = req.user;
  const rows = db.all('SELECT * FROM simulations WHERE user_id = ? ORDER BY created_at DESC', [user.id]);
  res.json(rows.map(r => ({ ...r, result_json: r.result_json ? JSON.parse(r.result_json) : null })));
}

function simulationDetails(req, res) {
  const user = req.user;
  const id = req.params.id;
  const sim = db.get('SELECT * FROM simulations WHERE id = ? AND user_id = ?', [id, user.id]);
  if (!sim) return res.status(404).json({ error: 'Not found' });

  const history = db.all('SELECT * FROM simulation_history WHERE simulation_id = ? ORDER BY event_time ASC', [id]);
  const files = db.all('SELECT * FROM files WHERE simulation_id = ?', [id]);

  // build graph data
  const revenue = []; const workload = []; const trust = [];
  history.forEach(h => {
    try {
      const snap = JSON.parse(h.result_snapshot || '{}');
      revenue.push(snap.revenue_drop ?? null);
      workload.push(snap.workload_change ?? snap.workload_increase ?? null);
      trust.push(snap.trust_drop ?? null);
    } catch (e) {
      revenue.push(null); workload.push(null); trust.push(null);
    }
  });

  res.json({ simulation: sim, history, files, graph_data: { revenue, workload, trust } });
}

async function rerun(req, res) {
  try {
    const user = req.user; const id = req.params.id;
    const sim = db.get('SELECT * FROM simulations WHERE id = ? AND user_id = ?', [id, user.id]);
    if (!sim) return res.status(404).json({ error: 'Not found' });

    // load file
    const file = db.get('SELECT * FROM files WHERE simulation_id = ? LIMIT 1', [id]);
    if (!file) return res.status(400).json({ error: 'No file to rerun' });

    const buf = fs.readFileSync(file.path);
    const records = parseCsvBuffer(buf);
    const summary = summarize(records);

    const question = req.body.question || null;
    const report = orchestrate({ event_type: sim.event_type, data: req.body });
    const result_json = JSON.stringify(report);

    db.run('UPDATE simulations SET input_summary = ?, result_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [JSON.stringify(summary), result_json, id]);
    db.run('INSERT INTO simulation_history (simulation_id, question, agent_responses, result_snapshot) VALUES (?, ?, ?, ?)', [id, question, JSON.stringify(report.perAgent || []), result_json]);

    // Build graph data from all history
    const historyRows = db.all('SELECT * FROM simulation_history WHERE simulation_id = ? ORDER BY event_time ASC', [id]);
    const revenue = []; const workload = []; const trust = [];
    historyRows.forEach(h => {
      try {
        const snap = JSON.parse(h.result_snapshot || '{}');
        revenue.push(snap.revenue_drop ?? null);
        workload.push(snap.workload_change ?? snap.workload_increase ?? null);
        trust.push(snap.trust_drop ?? null);
      } catch (e) { revenue.push(null); workload.push(null); trust.push(null); }
    });

    res.json({ id, result: report, graph_data: { revenue, workload, trust } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function report(req, res) {
  try {
    const user = req.user; const id = req.params.id;
    const sim = db.get('SELECT * FROM simulations WHERE id = ? AND user_id = ?', [id, user.id]);
    if (!sim) return res.status(404).json({ error: 'Not found' });

    const files = db.all('SELECT * FROM files WHERE simulation_id = ?', [id]);

      const REPORTS_DIR = process.env.REPORTS_DIR || './reports';
      const reportsDir = path.isAbsolute(REPORTS_DIR) ? REPORTS_DIR : path.join(__dirname, '..', REPORTS_DIR.replace(/^\.\//, ''));
      const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
      const toZip = [ { path: path.join(__dirname, '..', 'data', 'dummy.txt'), name: 'note.txt' } ];
      const tempZip = path.join(reportsDir, `simulation-${id}.zip`);

    // include actual simulation JSON
    const simJsonPath = path.join(__dirname, '..', 'reports', `simulation-${id}.json`);
    fs.writeFileSync(simJsonPath, JSON.stringify(sim, null, 2));
    toZip.push({ path: simJsonPath, name: `simulation-${id}.json` });

  files.forEach(f => toZip.push({ path: f.path, name: f.filename }));

    await zipFiles(tempZip, toZip);

    res.download(tempZip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { simulate, history, simulationDetails, rerun, report };
