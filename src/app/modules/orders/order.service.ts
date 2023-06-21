import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPagniationOptions } from '../../../interfaces/paginations';

import { IOrder, IOrderFilters } from './order.interface';
import { Order } from './order.model';
import { OrderSearchableFields } from './order.constant';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  
  const result = await Order.create(payload);
  return result;
};

const getAllOrder = async (
  filters: IOrderFilters,
  pagniationOptions: IPagniationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: OrderSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // console.log(Object.keys(filtersData));
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(pagniationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Order.find(whereConditions)
    // .populate('cow','buyer')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id)
  // .populate(
  //   'cow','buyer'
  // )
  return result;
};
const updateOrder = async (
  id: string,
  payload: Partial<IOrder>
): Promise<IOrder | null> => {
  const result = await Order.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  // .populate('cow','buyer')
  return result;
};
const deleteOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndDelete(id);

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
