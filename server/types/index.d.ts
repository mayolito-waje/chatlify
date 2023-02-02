import type mongoose from 'mongoose';

export {};

export interface DecodedUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  interests: mongoose.Schema.Types.ObjectId[];
  friends: mongoose.Schema.Types.ObjectId[];
  isOnline: boolean;
}

export interface RequestUser {
  name: string;
  email: string;
  picture?: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      user: DecodedUser;
      token: string;
    }
  }
}
