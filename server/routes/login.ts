import express, { type RequestHandler } from 'express';
import { loginUser } from '../controllers/login.js';

const loginRouter = express.Router();

loginRouter.post('/', loginUser as RequestHandler);

export default loginRouter;
