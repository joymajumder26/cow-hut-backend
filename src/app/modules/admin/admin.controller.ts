import { RequestHandler } from 'express';

import catctAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';

import { paginationFields } from '../../../constants/pagination';
import { AdminService } from './admin.service';
import { IAdmin } from './admin.interface';
import { adminFilterableFields } from './admin.constant';

const createAdmin: RequestHandler = catctAsync(async (req, res) => {
  const { admin } = req.body;
  const result = await AdminService.createAdmin(admin);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Admin Created Successfully',
    data: result,
  });
});

const getAllAdmins = catctAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  console.log(filters);
  // console.log(paginationOptions);
  const result = await AdminService.getAlladmins(filters, paginationOptions);
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Admins retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmins = catctAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminService.getSingleadmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Admins retrieved successfully',

    data: result,
  });
});

const updateAdmins = catctAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AdminService.updateadmin(id, updatedData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Admins updated successfully',

    data: result,
  });
});
const deleteAdmins = catctAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminService.deleteadmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    suceess: true,
    message: 'Admins deleted successfully',

    data: result,
  });
});

export const AdminController = {
  createAdmin,
  getAllAdmins,
  getSingleAdmins,
  updateAdmins,
  deleteAdmins,
};
