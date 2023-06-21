import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './users.interface';
import { role } from './user.constant';

const userSchema = new Schema<IUser>(
  {
    password: { type: String, required: true },
    role: { type: String, enum: role },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
