const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const auth = require('../middleware/authMiddleware');
const sim = require('../controllers/simulationController');

router.use(auth);

router.post('/simulate', upload.single('file'), sim.simulate);
router.get('/history', sim.history);
router.get('/simulation/:id', sim.simulationDetails);
router.post('/rerun/:id', sim.rerun);
router.get('/report/:id', sim.report);

module.exports = router;
