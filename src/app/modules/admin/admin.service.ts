import { SortOrder } from "mongoose"
import config from "../../../config"
import ApiError from "../../../errors/ApiError"
import { PaginationHelpers } from "../../../helpers/paginationHelper"
import { IGenericResponse } from "../../../interfaces/common"
import { IPagniationOptions } from "../../../interfaces/paginations"
import { adminSearchableFields } from "./admin.constant"


import { IAdmin, IAdminFilters } from "./admin.interface"
import { Admin } from "./admin.model"
// import { generateadminId } from "./admins.utills"
// import { generateadminId } from "./admins.utils"


const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  // auto generated incremental id
  console.log('admin', admin)
  // const id = await generateadminId()
  // admin.id = id
  // default password
  if (!admin.password) {
    console.log('---------------');
    admin.password = config.default_admin_pass as string
  }

  const createdAdmin = await Admin.create(admin)
  // console.log('createdadmin', createdadmin)

  if (!createAdmin) {
    throw new ApiError(400, 'Failed to create admin!')
  }
  return createdAdmin
}

const getAlladmins = async (
  filters: IAdminFilters,
  pagniationOptions: IPagniationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleadmin = async (
  id: string
): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};
const updateadmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  
  const result = await Admin.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteadmin = async (
  id: string
): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id);

  return result;
};


export const AdminService = {
  createAdmin,
  getAlladmins,
  getSingleadmin,updateadmin,deleteadmin
}
