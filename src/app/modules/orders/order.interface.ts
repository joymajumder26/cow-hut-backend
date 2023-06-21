import { Model, Types } from 'mongoose';
import { IUser } from '../user/users.interface';
import { ICow } from '../cow/cow.interface';




export type IOrder = {
 
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};

export type OrderModel = Model<
  IOrder,
  Record<string, unknown>
>;

export type IOrderFilters = {
  searchTerm?: string;
  cow?: Types.ObjectId;
  buyer?: Types.ObjectId;
};
