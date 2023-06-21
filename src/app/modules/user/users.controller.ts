import { RequestHandler } from 'express';
import { UserService } from './users.service';
import catctAsync from '../../../shared/catchAsync';
import { IUser } from './users.interface';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constant';
import { paginationFields } from '../../../constants/pagination';

const createUser: RequestHandler = catctAsync(async (req, res) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'user Created Successfully',
    data: result,
  });
});

const getAllUsers = catctAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  console.log(filters);
  // console.log(paginationOptions);
  const result = await UserService.getAllUsers(filters, paginationOptions);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUsers = catctAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Users retrieved successfully',

    data: result,
  });
});

const updateUsers = catctAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Users updated successfully',

    data: result,
  });
});
const deleteUsers = catctAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Users deleted successfully',

    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateUsers,
  deleteUsers,
};
