import config from "../../config";
import AppError from "../../errors/appError";
import { createToken, IJwtPayload } from "../../utils/token.utils";
import { UserStatus } from "../user/user.interface";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import httpStatus from "http-status";

const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExists(payload?.phone_number);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Please register first!");
  }

  if (user?.status === UserStatus.BLOCKED) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are blocked. Please contact to customer care."
    );
  }

  await User.isPasswordMatched(user?.password, payload?.password);

  const jwtPayload: IJwtPayload = {
    phone_number: user?.phone_number,
    role: user?.role,
    status: user?.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_access_secret as string,
    config.jwt.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
