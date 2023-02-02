import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import connectToMongoDB from './utils/db.js';
import {
  extractToken,
  resourceNotFound,
  errorHandler,
} from './utils/middlewares.js';
import usersRouter from './routes/users.js';
import testingRouter from './routes/testing.js';

const app = express();

void connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(extractToken);

app.use('/api/users', usersRouter);
app.get('/', (_req, res) => {
  res.send('api running');
});

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(resourceNotFound);
app.use(errorHandler);

export default app;
