import { SortOrder } from "mongoose"
import config from "../../../config"
import ApiError from "../../../errors/ApiError"
import { PaginationHelpers } from "../../../helpers/paginationHelper"
import { IGenericResponse } from "../../../interfaces/common"
import { IPagniationOptions } from "../../../interfaces/paginations"
import { userSearchableFields } from "./user.constant"
import { IUser, IUserFilters } from "./users.interface"
import { User } from "./users.model"
// import { generateUserId } from "./users.utills"
// import { generateUserId } from "./users.utils"


const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  console.log('user', user)
  // const id = await generateUserId()
  // user.id = id
  // default password
  if (!user.password) {
    console.log('---------------');
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  // console.log('createdUser', createdUser)

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!')
  }
  return createdUser
}

const getAllUsers = async (
  filters: IUserFilters,
  pagniationOptions: IPagniationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
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

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleUser = async (
  id: string
): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteUser = async (
  id: string
): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};


export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,updateUser,deleteUser
}
