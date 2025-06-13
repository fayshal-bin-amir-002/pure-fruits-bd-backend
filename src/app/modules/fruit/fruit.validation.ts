import { z } from "zod";
import { UnitType } from "./fruit.interface";

export const create = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: "Fruit name is required" })
        .min(2, "Fruit name must be at least 2 characters long")
        .trim(),
      image: z.string({ required_error: "Image URL is required" }),
      regular_price: z
        .number({ required_error: "Regular price is required" })
        .positive("Regular price must be positive")
        .min(0.01, "Regular price must be at least 0.01"),
      offer_price: z
        .number({ required_error: "Offer price is required" })
        .positive("Offer price must be positive")
        .min(0.01, "Offer price must be at least 0.01"),
      inStock: z
        .boolean({ required_error: "Stock status is required" })
        .default(true),
      description: z
        .string({ required_error: "Description is required" })
        .min(10, "Description must be at least 10 characters long")
        .trim(),
      unit: z.enum([UnitType.KG, UnitType.PIECE], {
        required_error: "Unit type is required",
        invalid_type_error: "Unit must be either kg or piece",
      }),
      quantity: z
        .number({ required_error: "Quantity is required" })
        .positive("Quantity must be positive")
        .min(1, "Quantity must be at least 1"),
      category: z.string({ required_error: "Category ID is required" }),
    })
    .refine((data) => data.offer_price <= data.regular_price, {
      message: "Offer price must not exceed regular price",
      path: ["offer_price"],
    }),
});

export const update = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(2, "Fruit name must be at least 2 characters long")
        .trim()
        .optional(),
      image: z.string({ required_error: "Image URL is required" }).optional(),
      regular_price: z
        .number()
        .positive("Regular price must be positive")
        .min(0.01, "Regular price must be at least 0.01")
        .optional(),
      offer_price: z
        .number()
        .positive("Offer price must be positive")
        .min(0.01, "Offer price must be at least 0.01")
        .optional(),
      inStock: z.boolean().default(true).optional(),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .trim()
        .optional(),
      unit: z
        .enum([UnitType.KG, UnitType.PIECE], {
          invalid_type_error: "Unit must be either kg or piece",
        })
        .optional(),
      quantity: z
        .number()
        .positive("Quantity must be positive")
        .min(1, "Quantity must be at least 1")
        .optional(),
      category: z
        .string({ required_error: "Category ID is required" })
        .optional(),
    })
    .refine(
      (data) => {
        if (
          data.regular_price !== undefined &&
          data.offer_price !== undefined
        ) {
          return data.offer_price <= data.regular_price;
        }
        return true;
      },
      {
        message: "Offer price must not exceed regular price",
        path: ["offer_price"],
      }
    ),
});

export const FruitValidationSchema = {
  create,
  update,
};
