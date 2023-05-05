import { config } from 'dotenv';
import app from './app.js';
import { connectDB } from './config/database.js';

config();
connectDB();

const PORT = process.env['PORT'] || 8080;

app.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});
