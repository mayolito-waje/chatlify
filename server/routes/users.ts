import express, { type RequestHandler } from 'express';
import {
  getUsers,
  registerUser,
  getLoggedUser,
  fetchUserById,
} from '../controllers/users.js';
import { extractUser } from '../utils/middlewares.js';

const usersRouter = express.Router();

usersRouter.get('/@me', extractUser, getLoggedUser as RequestHandler);
usersRouter.get('/', extractUser, getUsers as RequestHandler);
usersRouter.get('/:id', extractUser, fetchUserById as RequestHandler);
usersRouter.post('/', registerUser as RequestHandler);

export default usersRouter;
