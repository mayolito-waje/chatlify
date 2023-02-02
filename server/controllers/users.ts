import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import type { Request, Response } from 'express';
import User from '../models/user.js';
import type { RequestUser, LoginUser } from '../types/index.js';
import * as config from '../utils/config.js';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const keyword =
    req.query.search !== undefined
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};

  const users = await User.find(keyword).find({
    _id: { $ne: new mongoose.Types.ObjectId(req.user.id) },
  });

  res.json(users);
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, email, picture, password }: RequestUser = req.body;

  const validPasswordRegex: RegExp =
    /^(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-z])(?=.*\d).{8,}$/g;
  const isValidPassword = validPasswordRegex.test(password);

  if (!isValidPassword) {
    return res.status(400).json({
      error:
        'password should contain one: small letter, capital letter, number, and special character',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, picture, passwordHash });
  const createdUser = await newUser.save();

  res.status(201).json(createdUser);
};

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
