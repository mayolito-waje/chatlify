import mongoose from 'mongoose';
import type { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import Chat from '../models/chat.js';

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const requestChat = await Chat.findById(id);
  if (_.isNull(requestChat)) {
    next();
    return;
  }

  res.json(requestChat);
};

export const searchChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const targetUserId = req.query.user;
  const loggedUserId = req.user.id;

  const targetChat = await Chat.findOne({
    users: {
      $in: [
        new mongoose.Types.ObjectId(loggedUserId),
        new mongoose.Types.ObjectId(targetUserId as string),
      ],
    },
  });

  if (_.isNull(targetChat)) {
    res.statusCode = 400;
    throw new Error('chat not found');
  }

  res.json(targetChat);
};

export const createChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const targetUserId = req.query.user;
  const loggedUserId = req.user.id;

  const newChat = new Chat({
    users: [
      new mongoose.Types.ObjectId(loggedUserId),
      new mongoose.Types.ObjectId(targetUserId as string),
    ],
  });

  const createdChat = await newChat.save();

  res.status(201).json(createdChat);
};
