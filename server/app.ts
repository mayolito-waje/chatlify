import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (_req, res) => {
  res.send('api running');
});

export default app;
