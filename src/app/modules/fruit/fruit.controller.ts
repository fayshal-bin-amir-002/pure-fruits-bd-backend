import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FruitServices } from "./fruit.service";
import httpStatus from "http-status";

const createFruit = catchAsync(async (req, res) => {
  const result = await FruitServices.createFruit(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Fruit item added successfully.",
    data: result,
  });
});

const getAllFruit = catchAsync(async (req, res) => {
  const { result, meta } = await FruitServices.getAllFruit(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Fruit item retrived successfully.",
    data: result,
    meta: meta,
  });
});

const getAFruit = catchAsync(async (req, res) => {
  const result = await FruitServices.getAFruit(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fruit item data retrived successfully.",
    data: result,
  });
});

const updateAFruit = catchAsync(async (req, res) => {
  const result = await FruitServices.updateAFruit(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fruit item updated successfully.",
    data: result,
  });
});

const deleteFruit = catchAsync(async (req, res) => {
  await FruitServices.deleteFruit(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fruit item deleted successfully.",
  });
});

export const FruitControllers = {
  createFruit,
  getAllFruit,
  getAFruit,
  updateAFruit,
  deleteFruit,
};
