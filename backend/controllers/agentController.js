// Currently thin wrapper that uses simulateController.ask logic.
const simulateCtrl = require('./simulateController');

exports.ask = async (req, res) => {
  // For now delegate to simulateController.ask (which uses last simulation or history)
  return simulateCtrl.ask(req, res);
};
