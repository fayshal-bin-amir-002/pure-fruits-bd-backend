import AppError from "../../errors/appError";
import { IJwtPayload } from "../../utils/token.utils";
import Fruit from "../fruit/fruit.model";
import User from "../user/user.model";
import { IOrder, OrderStatus } from "./order.interface";
import httpStatus from "http-status";
import Order from "./order.model";
import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";

const createOrder = async (user: IJwtPayload, payload: IOrder) => {
  const isUserExists = await User.isUserExists(user?.phone_number);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  for (const orderedFruit of payload.fruits) {
    const fruit = await Fruit.findById(orderedFruit.fruit);

    if (!fruit) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Fruit with ID ${orderedFruit.fruit} not found!`
      );
    }

    if (!fruit.inStock) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `"${fruit.name}" is currently out of stock.`
      );
    }
  }

  const result = await Order.create(payload);

  return result;
};

const getAllOrder = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(["contact_number", "name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery.populate("fruits.fruit");
  const meta = await orderQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getAOrder = async (id: string) => {
  const result = await Order.findById(id).populate("fruits.fruit");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found!");
  }
  return result;
};

const orderStatusChange = async (
  id: string,
  payload: { status: OrderStatus }
) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found!");
  }

  const result = await Order.findByIdAndUpdate(
    id,
    { status: payload.status },
    { new: true }
  );

  return result;
};

const getMyOrder = async (id: string) => {
  const result = await Order.findById(id).populate("fruits.fruit");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found with this Id!");
  }
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrder,
  getAOrder,
  orderStatusChange,
  getMyOrder,
};
