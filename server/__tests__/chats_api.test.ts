import mongoose from 'mongoose';
import api from './helpers/api.js';
import * as helper from './helpers/test_helpers.js';
import Chat from '../models/chat.js';

beforeEach(async () => {
  await helper.seedUsers();
}, 100000);

describe('creating chat', () => {
  it('should create non group chat', async () => {
    const token = await helper.getTokenFromRoot();

    const loggedUserId = await helper.getRootId();
    const targetUserId: string = (await helper.usersInDB()).find(
      ({ email }) => email === 'user2@example.com'
    ).id;

    await Chat.deleteMany({});
    await api
      .post(`/api/chats/create?user=${targetUserId}`)
      .auth(token, { type: 'bearer' })
      .expect(201);

    const targetChat = await Chat.findOne({
      users: {
        $in: [
          new mongoose.Types.ObjectId(loggedUserId),
          new mongoose.Types.ObjectId(targetUserId),
        ],
      },
    });

    expect(targetChat).not.toBe(null);
  });
});

describe('searching chat', () => {
  it('should properly search chat with target user id', async () => {
    const token = await helper.getTokenFromRoot();

    const loggedUserId = await helper.getRootId();
    const { targetUserId } = await helper.createChat();

    const result = await api
      .get(`/api/chats/search?user=${targetUserId}`)
      .auth(token, { type: 'bearer' })
      .expect(200);

    expect(result.body.users).toContain(loggedUserId);
    expect(result.body.users).toContain(targetUserId);
  });

  it('should return error if there is no found user', async () => {
    const token = await helper.getTokenFromRoot();

    const unavailableTargetId = '507f1f77bcf86cd799439011';

    const result = await api
      .get(`/api/chats/search?user=${unavailableTargetId}`)
      .auth(token, { type: 'bearer' })
      .expect(400);

    expect(result.body.error).toBe('chat not found');
  });
});

afterAll(() => {
  void mongoose.connection.close();
});
