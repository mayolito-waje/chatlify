import bcrypt from 'bcryptjs';
import User from '../../../models/user.js';
import api from './api.js';

export const users = [
  {
    name: 'root',
    email: 'root@example.com',
    password: 'secretPassword#00',
  },
  {
    name: 'user1',
    email: 'user1@example.com',
    password: 'secretPassword#01',
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: 'secretPassword#02',
  },
  {
    name: 'user3',
    email: 'user3@example.com',
    password: 'secretPassword#03',
  },
];

export const seedUsers = async (): Promise<void> => {
  await User.deleteMany({});

  const populateUsers = await Promise.all(
    users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(user.password, salt);

      return new User({
        name: user.name,
        email: user.email,
        passwordHash,
      });
    })
  );

  await Promise.all(populateUsers.map(async (user) => await user.save()));
};

export const getTokenFromRoot = async (): Promise<string> => {
  const user = await api
    .post('/api/login')
    .send({
      email: 'root@example.com',
      password: 'secretPassword#00',
    })
    .expect(200);

  const { token } = user.body;
  return token;
};
