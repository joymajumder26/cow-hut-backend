import { Request, Response } from 'express';
import catctAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';
import { cowFilterableFields } from './cow.constant';
import { Cow } from './cow.model';
import { User } from '../user/users.model';
import ApiError from '../../../errors/ApiError';


const createCow = catctAsync(async (req: Request, res: Response) => {
  // console.log('+++++++++++++',req.body);
  const { ...cowData } = req.body;
  // Retrieve the seller from the database
  const seller = await User.findById(cowData?.seller)
  // console.log('seller',seller);

  if (!seller) {
    return res.status(404).json({ error: 'Seller not found' });
  }
  if(seller.role === 'seller'){
 const result = await CowService.createCow(cowData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Cow Created Successfully',
    data: result,
  });
  }else{
    throw new ApiError(400, 'Failed to create user!')
  }
 
});

const getAllCow = catctAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  console.log(filters);
  // console.log(paginationOptions);
  const result = await CowService.getAllCow(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Cow retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catctAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Cow retrieved successfully',

    data: result,
  });
});

const updateCow = catctAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await CowService.updateCow(id, updatedData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Cow updated successfully',

    data: result,
  });
});
const deleteCow = catctAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Cow deleted successfully',

    data: result,
  });
});
export const CowController = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
