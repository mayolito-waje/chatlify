import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import User from '../models/user.js';
import type { RequestUser } from '../types/users.js';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const keyword =
    req.query.search !== undefined
      ? {
          name: { $regex: req.query.search, $options: 'i' },
        }
      : {};

  const users = await User.find(keyword)
    .find({
      _id: { $ne: new mongoose.Types.ObjectId(req.user.id) },
    })
    .sort({ name: 1, email: 1, createdAt: 1, updatedAt: 1 });

  res.json(users);
};

export const fetchUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const fetchedUser = await User.findById(id);
  res.json(fetchedUser);
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, email, picture, password }: RequestUser = req.body;

  const validPasswordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/g;
  const isValidPassword = validPasswordRegex.test(password);

  if (!isValidPassword) {
    return res.status(400).json({
      error:
        'password must have small letter, capital letter, number, and at least 8 characters long',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, picture, passwordHash });
  const createdUser = await newUser.save();

  res.status(201).json(createdUser);
};

export const getLoggedUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.user;
  const loggedUser = await User.findById(id);
  res.json(loggedUser);
};
