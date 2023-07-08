import { Model } from 'mongoose';

export type name = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  // id: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin';
  name: name; //embedded object

  phoneNumber: string;

  address: string;
  budget: number;
  income: number | 0;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  adress?: string;
  budget?: number;
};
