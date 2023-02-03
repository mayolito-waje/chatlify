import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import * as config from '../utils/config.js';
import type { Request, Response } from 'express';
import type { LoginUser } from '../types/users.js';

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password }: LoginUser = req.body;

  const user = await User.findOne({ email });

  const isPasswordMatched: boolean = _.isNull(user)
    ? false
    : await bcrypt.compare(password, user?.passwordHash);

  if (!isPasswordMatched) {
    return res.status(401).json({
      error: 'email or password not matched',
    });
  }

  const token = jwt.sign(
    {
      id: user?._id,
      name: user?.name,
      email: user?.email,
    },
    config.JWT_SECRET as 'Secret',
    { expiresIn: '30d' }
  );

  return res.json({
    token,
    name: user?.name,
    email: user?.email,
    id: user?.id.toString(),
  });
};
