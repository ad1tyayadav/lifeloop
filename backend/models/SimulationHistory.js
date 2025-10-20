const mongoose = require('mongoose');

const SimulationHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  simulationName: { type: String },
  riskLevel: { type: String },
  fileName: { type: String },
  totalTransactions: { type: Number },
  suspiciousItems: { type: Number },
  eventType: { type: String },
  result: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SimulationHistory', SimulationHistorySchema);
