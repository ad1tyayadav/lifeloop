const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/authMiddleware');
const simulateCtrl = require('../controllers/simulateController');
const agentCtrl = require('../controllers/agentController');

const uploadsDir = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Upload CSV and run simulation
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const resp = await simulateCtrl.uploadAndSimulate(req, res);
  // store last simulation quick cache
  if (resp && resp.history) simulateCtrl.storeLastSim(req.user._id, resp.history);
});

// Q&A endpoint
router.post('/ask', auth, agentCtrl.ask);

module.exports = router;
