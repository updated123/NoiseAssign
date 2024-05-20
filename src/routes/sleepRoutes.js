const express = require('express');
const sleepController = require('../controllers/sleepController');

const router = express.Router();

router.post('/sleep', sleepController.createSleepRecord);
router.get('/sleep/:userId', sleepController.getSleepRecords);
router.delete('/sleep/:recordId', sleepController.deleteSleepRecord);

module.exports = router;
