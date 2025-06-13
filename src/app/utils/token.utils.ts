import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole, UserStatus } from "../modules/user/user.interface";

export interface IJwtPayload {
  phone_number: string;
  role: UserRole;
  status: UserStatus;
}

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string | any
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
