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

interestSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Interest', interestSchema);
