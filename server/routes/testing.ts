import express, {
  type Request,
  type Response,
  type RequestHandler,
} from 'express';
import User from '../models/user.js';

const testingRouter = express.Router();

testingRouter.post('/reset', (async (
  _req: Request,
  res: Response
): Promise<void> => {
  await User.deleteMany({});

  res.status(204).end();
}) as RequestHandler);

export default testingRouter;
