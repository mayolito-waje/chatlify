import type { DecodedUser } from './users.js';

declare global {
  namespace Express {
    interface Request {
      user: DecodedUser;
      token: string;
    }
  }
}
