import express, { type RequestHandler } from 'express';
import { getUsers, registerUser } from '../controllers/users.js';
import { extractUser } from '../utils/middlewares.js';

const usersRouter = express.Router();

usersRouter.get('/', extractUser, getUsers as RequestHandler);
usersRouter.post('/', registerUser as RequestHandler);

export default usersRouter;
