export {};

export interface DecodedUser {
  id: string;
  name: string;
  email: string;
}

export interface RequestUser {
  name: string;
  email: string;
  picture?: string;
  password: string;
}

export interface LoginUser {
  email: string;
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
