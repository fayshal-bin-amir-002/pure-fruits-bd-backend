import { z } from "zod";

const create = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Category name is required" })
      .min(2, "Category name must be at least 2 characters long")
      .trim(),
    image: z.string({ required_error: "Image URL is required" }),
  }),
});

const update = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Category name is required" })
      .min(2, "Category name must be at least 2 characters long")
      .trim()
      .optional(),
    image: z.string({ required_error: "Image URL is required" }).optional(),
  }),
});

export const FruitCategorySchema = {
  create,
  update,
};
