import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as config from './config.js';
import type { DecodedUser } from '../types/users.js';

export const extractToken = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authorization = req.get('authorization');

  if (authorization?.toLowerCase().startsWith('bearer') === true) {
    const token = authorization.substring(7);
    req.token = token;
  }

  next();
};

export const extractUser = (
  req: Request,
  _res: Response,
  next: NextFunction
): any => {
  const { token } = req;
  if (token === undefined) {
    next();
    return null;
  }

  const decodedToken = jwt.verify(
    token,
    config.JWT_SECRET as 'Secret | GetPublicKeyOrSecret'
  );

  req.user = decodedToken as DecodedUser;
  next();
};

export const resourceNotFound = (_req: Request, res: Response): any =>
  res.status(404).json({
    error: 'Resource Not Found',
    status: 404,
  });

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.error('Error: ', err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted ID' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }
  if (err.message.includes('E11000 duplicate key error collection')) {
    return res
      .status(400)
      .json({ error: 'email should be unique (email is already taken)' });
  }
  next(err);
};
