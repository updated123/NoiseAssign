const request = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../../server');
  

describe('Sleep Tracker API', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost/noise_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /api/sleep', () => {
    it('should create a new sleep record', async () => {
      const res = await request(app)
        .post('/api/sleep')
        .send({ userId: 'user1', hours: 8, timestamp: new Date() });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('_id');
      expect(res.body.userId).to.equal('user1');
    });

    it('should return 400 for invalid data', async () => {
      const res = await request(app)
        .post('/api/sleep')
        .send({ userId: 'user2' });  // Missing hours and timestamp
      expect(res.status).to.equal(400);
    });
  });

  describe('GET /api/sleep/:userId', () => {
    it('should retrieve sleep records for a user', async () => {
      const res = await request(app).get('/api/sleep/user1');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('DELETE /api/sleep/:recordId', () => {
    it('should delete a sleep record', async () => {
      const sleepRecord = await request(app)
        .post('/api/sleep')
        .send({ userId: 'user3', hours: 7, timestamp: new Date() });

      const res = await request(app)
        .delete(`/api/sleep/${sleepRecord.body._id}`);
      expect(res.status).to.equal(200);
    });

    it('should return 404 for non-existing record', async () => {
      const res = await request(app).delete('/api/sleep/60b6c13f9b1f2c001a3b9d90');
      expect(res.status).to.equal(404);
    });
  });
});
