import mongoose from 'mongoose';
import * as config from '../utils/config.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      unique: [true, 'email must be unique'],
      required: [true, 'email is required'],
    },
    passwordHash: {
      type: String,
      required: [true, 'a password is required'],
    },
    picture: {
      type: String,
      required: true,
      default: config.DEFAULT_PIC_URL,
    },
    interests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interest',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isOnline: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default mongoose.model('User', userSchema);
