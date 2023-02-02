import express, { type RequestHandler } from 'express';
import { getUsers, registerUser, loginUser } from '../controllers/users.js';
import { extractUser } from '../utils/middlewares.js';

const usersRouter = express.Router();

usersRouter.post('/login', loginUser as RequestHandler);
usersRouter.get('/', extractUser, getUsers as RequestHandler);
usersRouter.post('/', registerUser as RequestHandler);

export default usersRouter;
