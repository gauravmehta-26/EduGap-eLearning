import mongoose, { Schema, Model } from 'mongoose';

export interface IUserResult {
  email: string;
  failureRisk: number;
  weakConcepts: string[];
  createdAt: Date;
}

const UserResultSchema = new Schema<IUserResult>({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  failureRisk: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  weakConcepts: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model recompilation in development
const UserResult: Model<IUserResult> = 
  mongoose.models.UserResult || mongoose.model<IUserResult>('UserResult', UserResultSchema);

export default UserResult;
