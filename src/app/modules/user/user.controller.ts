import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Registration successfully. Please login now.",
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const { result, meta } = await UserServices.getAllUser(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user retrived successfully.",
    data: result,
    meta: meta,
  });
});

const getAUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data retrived successfully.",
    data: result,
  });
});

const userStatusChange = catchAsync(async (req, res) => {
  const result = await UserServices.userStatusChange(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status changed successfully.",
    data: result,
  });
});

const userRoleChange = catchAsync(async (req, res) => {
  const result = await UserServices.userRoleChange(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role changed successfully.",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  getAUser,
  userStatusChange,
  userRoleChange,
};
