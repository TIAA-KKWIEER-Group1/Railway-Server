import mongoose from 'mongoose';

export const connectDB = () => {
  const MONGODB_URL = process.env.MONGODB_URL;

  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log('DB CONNECTED SUCCESSFULLY');
    })
    .catch((error) => {
      console.log('DB CONNECTION FAILED');
      console.log(error);
      process.exit(1);
    });
};
