import mongoose from 'mongoose';
import * as helper from './helpers/test_helpers.js';
import api from './helpers/api.js';

beforeEach(async () => {
  await helper.seedUsers();
}, 100000);

describe('fetching users', () => {
  test('fetch all users except for the logged in user and return json', async () => {
    const token = await helper.getTokenFromRoot();

    const fetchedUsers = await api
      .get('/api/users/')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(fetchedUsers.body).toHaveLength(helper.users.length - 1);

    const names = fetchedUsers.body.map((user: any) => user.name);
    expect(names).not.toContain('root');
  });

  test('fetch proper user with query', async () => {
    const token = await helper.getTokenFromRoot();

    const fetchedUser = await api
      .get('/api/users/?search=user1')
      .auth(token, { type: 'bearer' });

    expect(fetchedUser.body).toHaveLength(1);
    expect(fetchedUser.body[0].name).toBe('user1');
  });
});

afterAll(() => {
  void mongoose.connection.close();
});
