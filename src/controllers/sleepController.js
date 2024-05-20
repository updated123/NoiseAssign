const sleepService = require('../services/sleepService');

class SleepController {
  async createSleepRecord(req, res) {
    try {
      const { userId, hours, timestamp } = req.body;
      const sleepRecord = await sleepService.createSleepRecord({ userId, hours, timestamp });
      res.status(201).send(sleepRecord);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getSleepRecords(req, res) {
    try {
      const { userId } = req.params;
      const records = await sleepService.getSleepRecordsByUserId(userId);
      res.status(200).send(records);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async deleteSleepRecord(req, res) {
    try {
      const { recordId } = req.params;
      const result = await sleepService.deleteSleepRecord(recordId);
      if (!result) {
        return res.status(404).send({ error: 'Record not found' });
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

module.exports = new SleepController();
