import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import connectToMongoDB from './utils/db.js';

const app = express();

connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (_req, res) => {
  res.send('api running');
});

export default app;
