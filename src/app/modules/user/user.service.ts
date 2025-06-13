import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";
import { IJwtPayload } from "../../utils/token.utils";
import { IUser, UserRole, UserStatus } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status";

const createUser = async (payload: IUser) => {
  const user = await User.isUserExists(payload.phone_number);
  if (user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Already registered. Please login in."
    );
  }

  const result = await User.create(payload);

  return result;
};

const getAllUser = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(["phone_number"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getAUser = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "This user not found!");
  }

  return result;
};

const userStatusChange = async (
  id: string | Types.ObjectId,
  payload: { status: UserStatus }
) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user not found!");
  }
  const result = await User.findByIdAndUpdate(
    id,
    {
      status: payload.status,
    },
    { new: true }
  );
  return result;
};

const userRoleChange = async (
  id: string | Types.ObjectId,
  payload: { role: UserRole }
) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user not found!");
  }
  if (user?.status === UserStatus.BLOCKED) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is blocked!");
  }
  const result = await User.findByIdAndUpdate(
    id,
    {
      role: payload.role,
    },
    { new: true }
  );
  return result;
};

export const UserServices = {
  createUser,
  getAllUser,
  getAUser,
  userStatusChange,
  userRoleChange,
};
