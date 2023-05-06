import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/route.js';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptionForCredentials = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptionForCredentials));

// Default route
app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Railway-Server API' });
});

app.use('/user', routes.userRoutes);
app.use('/admin', routes.adminRoutes);
app.use('/train', routes.trainRoutes);
app.use('/ticket', routes.reservationRoutes);

// Not found route
app.get('*', (req, res) => {
  return res.status(404).json({ message: 'API URL is not valid' });
});

export default app;
