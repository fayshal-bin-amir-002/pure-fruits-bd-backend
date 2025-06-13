import { Document, Model } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser extends Document {
  phone_number: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserModel extends Model<IUser> {
  isUserExists(phone_number: string): Promise<IUser | null>;
  isPasswordMatched(
    hashedPassword: string,
    plainTextPassword: string
  ): Promise<boolean>;
}
