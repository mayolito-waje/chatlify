import mongoose from 'mongoose';
import api from './helpers/api.js';
import * as helper from './helpers/test_helpers.js';

beforeEach(async () => {
  await helper.seedUsers();
}, 100000);

describe('log in', () => {
  it('should successfully login with registered user', async () => {
    await api
      .post('/api/login')
      .send({
        email: 'root@example.com',
        password: 'secretPassword#00',
      })
      .expect(200);
  });

  it('should not successfully login with wrong credentials', async () => {
    const result = await api
      .post('/api/login')
      .send({
        email: 'notAUser@example.com',
        password: 'secretPassword#00',
      })
      .expect(401);

    expect(result.body.error).toBe('email or password not matched');
  });
});

afterAll(() => {
  void mongoose.connection.close();
});
