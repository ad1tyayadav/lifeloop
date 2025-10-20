const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const historyCtrl = require('../controllers/historyController');

router.get('/', auth, historyCtrl.list);
router.get('/:id', auth, historyCtrl.get);
router.post('/:id/resume', auth, historyCtrl.resume);
router.get('/:id/download', auth, historyCtrl.download);

module.exports = router;
