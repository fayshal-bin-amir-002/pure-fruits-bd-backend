import { model, Schema } from "mongoose";
import { IUser, UserModel, UserRole, UserStatus } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const userSchema = new Schema<IUser>(
  {
    phone_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{11}$/, "Phone number must be exactly 11 digits (0-9)"],
    },
    password: {
      type: String,
      required: true,
      select: 0,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      required: true,
      default: UserStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_round)
  );

  next();
});

userSchema.statics.isUserExists = async function (phone_number: string) {
  return await User.findOne({ phone_number }).select("+password");
};

userSchema.statics.isPasswordMatched = async (
  hashedPassword: string,
  plainTextPassword: string
) => {
  const isPasswordMatched = await bcrypt.compare(
    plainTextPassword,
    hashedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Wrong password");
  }
  return isPasswordMatched;
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
