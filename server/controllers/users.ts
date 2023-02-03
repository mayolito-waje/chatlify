import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import User from '../models/user.js';
import type { RequestUser } from '../types/users.js';

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
        'password requirements: small, capital, and special letter, number, 8 characters long',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, picture, passwordHash });
  const createdUser = await newUser.save();

  res.status(201).json(createdUser);
};
