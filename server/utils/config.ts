import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI: string | undefined =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

export const { JWT_SECRET, DEFAULT_PIC_URL } = process.env;
