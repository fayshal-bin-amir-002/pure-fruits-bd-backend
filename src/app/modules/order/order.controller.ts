import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { OrderServices } from "./order.service";
import { IJwtPayload } from "../../utils/token.utils";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(
    req.user as IJwtPayload,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order placed successfully.",
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const { result, meta } = await OrderServices.getAllOrder(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All order retrived successfully.",
    data: result,
    meta: meta,
  });
});

const getAOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getAOrder(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrived successfully.",
    data: result,
  });
});

const orderStatusChange = catchAsync(async (req, res) => {
  const result = await OrderServices.orderStatusChange(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order status changed successfully.",
    data: result,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const { result, meta } = await OrderServices.getMyOrders(
    req.user as IJwtPayload,
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User all order retrived successfully.",
    data: result,
    meta: meta,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getAOrder,
  orderStatusChange,
  getMyOrders,
};
