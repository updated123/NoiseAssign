const sleepRepository = require('../repositories/sleepRepository');

class SleepService {
  async createSleepRecord(data) {
    return sleepRepository.create(data);
  }

  async getSleepRecordsByUserId(userId) {
    return sleepRepository.findByUserId(userId);
  }

  async deleteSleepRecord(recordId) {
    return sleepRepository.deleteById(recordId);
  }
}

module.exports = new SleepService();
