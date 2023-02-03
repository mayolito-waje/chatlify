import mongoose from 'mongoose';
import * as helper from './helpers/test_helpers.js';
import api from './helpers/api.js';
import type { RequestUser } from '../types/users.js';

beforeEach(async () => {
  await helper.seedUsers();
}, 100000);

describe('fetching users', () => {
  it('fetch all users except for the logged in user and return json', async () => {
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

  it('fetch proper user with query', async () => {
    const token = await helper.getTokenFromRoot();

    const fetchedUser = await api
      .get('/api/users/?search=user1')
      .auth(token, { type: 'bearer' });

    expect(fetchedUser.body).toHaveLength(1);
    expect(fetchedUser.body[0].name).toBe('user1');
  });

  it('should prohibit viewing users if not logged in', async () => {
    const response = await api.get('/api/users/').expect(401);
    expect(response.body.error).toBe('token is missing');
  });
});

describe('register users', () => {
  it('successfully register user with correct credentials', async () => {
    const newUser: RequestUser = {
      name: 'New User',
      email: 'new_user@example.com',
      password: 'newUser#123',
    };

    await api.post('/api/users').send(newUser).expect(201);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.users.length + 1);
  });

  it("don't register with invalid password", async () => {
    const invalidPasswords = [
      'short',
      'testPassword0',
      'noNumber#',
      'noNumbersAndSpecialChars',
      'allsmallletters',
    ];

    for (const password of invalidPasswords) {
      const newUser: RequestUser = {
        name: 'New User',
        email: 'new_user@example.com',
        password,
      };

      const result = await api.post('/api/users').send(newUser).expect(400);
      expect(result.body.error).toBe(
        'password requirements: small, capital, and special letter, number, 8 characters long'
      );
    }
  });

  it("don't register with duplicate email", async () => {
    const newUser: RequestUser = {
      name: 'New User',
      email: 'root@example.com',
      password: 'validPassword#01',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    expect(result.body.error).toBe(
      'email should be unique (email is already taken)'
    );
  });
});

afterAll(() => {
  void mongoose.connection.close();
});
