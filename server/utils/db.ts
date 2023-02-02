import mongoose from 'mongoose';
import * as config from './config.js';

mongoose.set('strictQuery', true);

const connectToMongoDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI as string);
    console.log('connected to MongoDB: ', conn.connection.host);
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error);
  }
};

export default connectToMongoDB;
