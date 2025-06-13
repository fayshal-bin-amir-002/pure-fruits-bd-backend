import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";
import { IFruitCategory } from "./fruitCategory.interface";
import FruitCategory from "./fruitCategory.model";
import httpStatus from "http-status";

const createFruitCategory = async (payload: IFruitCategory) => {
  const isExists = await FruitCategory.findOne({ name: payload.name });
  if (isExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This Fruit Category name is already exists"
    );
  }

  const result = await FruitCategory.create(payload);

  return result;
};

const getAllFruitCategory = async (query: Record<string, unknown>) => {
  const fruitCategoryQuery = new QueryBuilder(FruitCategory.find(), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await fruitCategoryQuery.modelQuery;
  // const meta = await fruitCategoryQuery.countTotal();

  return {
    result,
  };
};

const getAFruitCategory = async (id: string) => {
  const result = await FruitCategory.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "This fruit category not found!");
  }
  return result;
};

const updateFruitCategory = async (
  id: string,
  payload: Partial<IFruitCategory>
) => {
  const fruitCategory = await FruitCategory.findById(id);
  if (!fruitCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "This fruit category not found!");
  }

  const result = await FruitCategory.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true }
  );
  return result;
};

const deleteFruitCategory = async (id: string) => {
  const fruitCategory = await FruitCategory.findById(id);
  if (!fruitCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "This fruit category not found!");
  }
  const result = await FruitCategory.findByIdAndDelete(id);
  return result;
};

export const FruitCategoryServices = {
  createFruitCategory,
  getAllFruitCategory,
  getAFruitCategory,
  updateFruitCategory,
  deleteFruitCategory,
};
