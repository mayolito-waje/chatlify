import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectToMongoDB from './utils/db.js';
import {
  extractToken,
  resourceNotFound,
  errorHandler,
} from './utils/middlewares.js';
import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';
import testingRouter from './routes/testing.js';

const app = express();

void connectToMongoDB();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(extractToken);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.get('/', (_req, res) => {
  res.send('api running');
});

app.use(resourceNotFound);
app.use(errorHandler);

export default app;
