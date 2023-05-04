import express, { urlencoded } from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

// Default route
app.get('/', cors(), async (req, res) => {
  res.status(200).json({ message: 'Railway-Server API' });
});

// Not found route
app.get('*', cors(), (req, res) => {
  return res.status(404).json({ message: 'API URL is not valid' });
});

export default app;
