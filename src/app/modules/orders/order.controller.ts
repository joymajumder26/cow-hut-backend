import { Request, Response } from 'express';
import catctAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IOrder } from './order.interface';
import { OrderFilterableFields } from './order.constant';
import { OrderService } from './order.service';
import { User } from '../user/users.model';
import ApiError from '../../../errors/ApiError';



const createOrder = catctAsync(async (req: Request, res: Response) => {
  const { ...OrderData } = req.body;
  const buyer = await User.findById(OrderData?.buyer)
  

  if (!buyer) {
    return res.status(404).json({ error: 'Seller not found' });
  }
  if(buyer.role === 'buyer'){
  const result = await OrderService.createOrder(OrderData);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Order Created Successfully',
    data: result,
  });
}else{
  throw new ApiError(400, 'Failed to create user!')
}
});

const getAllOrder = catctAsync(async (req: Request, res: Response) => {
  
  const filters = pick(req.query, OrderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderService.getAllOrder(filters,paginationOptions);
  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Order retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleOrder = catctAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await OrderService.getSingleOrder(id);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Order retrieved successfully',

    data: result,
  });
});

const updateOrder = catctAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await OrderService.updateOrder(id, updatedData);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Order updated successfully',

    data: result,
  });
});
const deleteOrder = catctAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await OrderService.deleteOrder(id);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Order deleted successfully',

    data: result,
  });
});
export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
