import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    userCount: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Interest', interestSchema);
