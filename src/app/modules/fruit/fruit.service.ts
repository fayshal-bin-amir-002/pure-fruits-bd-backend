import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";
import FruitCategory from "../fruitCategory/fruitCategory.model";
import { IFruit } from "./fruit.interface";
import Fruit from "./fruit.model";
import httpStatus from "http-status";

const createFruit = async (payload: IFruit) => {
  const fruit = await Fruit.findOne({ name: payload?.name });
  if (fruit) {
    throw new AppError(httpStatus.BAD_REQUEST, "This fruit is already exists.");
  }
  const category = await FruitCategory.findById(payload?.category);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "This fruit category not found!");
  }
  const result = await Fruit.create(payload);
  return result;
};

const getAllFruit = async (query: Record<string, unknown>) => {
  const fruitQuery = new QueryBuilder(Fruit.find(), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await fruitQuery.modelQuery.populate("category");
  const meta = await fruitQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getAFruit = async (id: string) => {
  const fruit = await Fruit.findById(id).populate("category");
  if (!fruit) {
    throw new AppError(httpStatus.NOT_FOUND, "Fruit item not found!");
  }

  return fruit;
};

const updateAFruit = async (id: string, payload: Partial<IFruit>) => {
  const fruit = await Fruit.findById(id);
  if (!fruit) {
    throw new AppError(httpStatus.NOT_FOUND, "Fruit not found!");
  }
  const result = await Fruit.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true }
  ).populate("category");
  return result;
};

const deleteFruit = async (id: string) => {
  const fruit = await Fruit.findById(id);
  if (!fruit) {
    throw new AppError(httpStatus.NOT_FOUND, "Fruit not found!");
  }
  await Fruit.findByIdAndDelete(id);
};

export const FruitServices = {
  createFruit,
  getAllFruit,
  getAFruit,
  updateAFruit,
  deleteFruit,
};
