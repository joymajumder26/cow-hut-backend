
import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPagniationOptions } from '../../../interfaces/paginations';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';



const createCow = async (
  payload: ICow
): Promise<ICow> => {
  const result = (await Cow.create(payload))
  return result;
};

const getAllCow = async (
  filters: ICowFilters,
  pagniationOptions: IPagniationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
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

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleCow = async (
  id: string
): Promise<ICow | null> => {
  const result = await Cow.findById(id)
  .populate(
    'seller'
  )
  ;
  return result;
};
const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )
  .populate('seller')
  ;
  return result;
};
const deleteCow = async (
  id: string
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);

  return result;
};

export const CowService = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
