import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/route.js';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Default route
app.get('/', cors(), async (req, res) => {
  res.status(200).json({ message: 'Railway-Server API' });
});

app.use('/user', routes.userRoutes);

// Not found route
app.get('*', cors(), (req, res) => {
  return res.status(404).json({ message: 'API URL is not valid' });
});

export default app;
