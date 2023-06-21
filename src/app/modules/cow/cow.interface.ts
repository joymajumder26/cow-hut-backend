import { Model, Types } from 'mongoose';
import { IUser } from '../user/users.interface';




export type ICow = {
  name:string;
  age:number;
  price:number;
  location: "Dhaka"| "Chittagong"| "Rajshahi"| "Khulna"| "Barisal"|"Sylhet"| "Rangpur"|"Mymensingh";
  breed: "Brahman"|"Nellore"|"Sahiwal"|"Gir"|"Indigenous"|"Tharparkar"|"Kankrej";
  weight:string;
  label: "for sale"|"sold out";
  category:"Dairy"|"Beef"|"DualPurpose"
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<
  ICow,
  Record<string, unknown>
>;

export type ICowFilters = {
  searchTerm?: string;
  seller?: Types.ObjectId;
};
