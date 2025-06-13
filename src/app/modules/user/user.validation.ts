import { z } from "zod";
import { UserRole, UserStatus } from "./user.interface";

const create = z.object({
  body: z.object({
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .regex(/^[0-9]{11}$/, "Phone number must be exactly 11 digits (0-9)"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    role: z
      .enum([UserRole.USER], {
        required_error: "Role is required",
        invalid_type_error: "Role must be USER",
      })
      .default(UserRole.USER),
    status: z
      .enum([UserStatus.ACTIVE], {
        required_error: "Status is required",
      })
      .default(UserStatus.ACTIVE),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED], {
      required_error: "Status is required",
    }),
  }),
});

const updateRole = z.object({
  body: z.object({
    role: z.enum([UserRole.USER, UserRole.ADMIN], {
      required_error: "Role is required",
      invalid_type_error: "Role must be USER or ADMIN",
    }),
  }),
});

export const UserValidation = {
  create,
  updateStatus,
  updateRole,
};
