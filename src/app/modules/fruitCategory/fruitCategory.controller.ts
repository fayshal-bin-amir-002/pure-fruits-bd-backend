import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FruitCategoryServices } from "./fruitCategory.service";
import sendResponse from "../../utils/sendResponse";

const createFruitCategory = catchAsync(async (req, res) => {
  const result = await FruitCategoryServices.createFruitCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Fruit Category created successfully",
    data: result,
  });
});

const getAllFruitCategory = catchAsync(async (req, res) => {
  const { result } = await FruitCategoryServices.getAllFruitCategory(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Fruit Category retrived successfully",
    data: result,
  });
});

const getAFruitCategory = catchAsync(async (req, res) => {
  const result = await FruitCategoryServices.getAFruitCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fruit Category retrived successfully",
    data: result,
  });
});

const updateFruitCategory = catchAsync(async (req, res) => {
  const result = await FruitCategoryServices.updateFruitCategory(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fruit Category updated successfully",
    data: result,
  });
});

const deleteFruitCategory = catchAsync(async (req, res) => {
  const result = await FruitCategoryServices.deleteFruitCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fruit Category deleted successfully",
    data: result,
  });
});

export const FruitCategoryControllers = {
  createFruitCategory,
  getAllFruitCategory,
  getAFruitCategory,
  updateFruitCategory,
  deleteFruitCategory,
};
