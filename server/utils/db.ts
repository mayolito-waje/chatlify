import mongoose from 'mongoose';
import * as config from './config.js';
import * as logger from './logger.js';

mongoose.set('strictQuery', true);

const connectToMongoDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI as string);
    logger.info('connected to MongoDB: ', conn.connection.host);
  } catch (error) {
    logger.error('Error connecting to MongoDB: ', error);
  }
};

export default connectToMongoDB;
