import mongoose from 'mongoose';

const MONGO_URL  = process.env.MONGO_URL;

// MongoDB Connection
export const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};
