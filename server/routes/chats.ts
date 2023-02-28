import express from 'express';
import type { RequestHandler } from 'express';
import { extractUser } from '../utils/middlewares.js';
import { searchChat, createChat, getChat } from '../controllers/chats.js';

const chatRouter = express.Router();

chatRouter.get('/search', extractUser, searchChat as RequestHandler);
chatRouter.post('/create', extractUser, createChat as RequestHandler);
chatRouter.get('/:id', extractUser, getChat as RequestHandler);

export default chatRouter;
