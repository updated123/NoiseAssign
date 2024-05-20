const Sleep = require('../models/sleepModel');

class SleepRepository {
  async create(sleepData) {
    const sleep = new Sleep(sleepData);
    return sleep.save();
  }

  async findByUserId(userId) {
    return Sleep.find({ userId }).sort({ timestamp: -1 });
  }

  async deleteById(recordId) {
    return Sleep.findByIdAndDelete(recordId);
  }
}

module.exports = new SleepRepository();
