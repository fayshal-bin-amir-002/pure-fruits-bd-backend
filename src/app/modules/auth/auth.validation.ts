import { z } from "zod";

const login = z.object({
  body: z.object({
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .trim()
      .regex(/^[0-9]{11}$/, "Phone number must be exactly 11 digits (0-9)"),
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export const AuthValidation = {
  login,
};
