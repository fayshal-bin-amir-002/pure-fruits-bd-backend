import { z } from "zod";
import { UnitType } from "../fruit/fruit.interface";
import { OrderStatus } from "./order.interface";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const orderedFruitSchema = z.object({
  fruit: objectId,
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

const create = z.object({
  body: z.object({
    customer: objectId.optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    address: z.string().min(4, "Name must be at least 4 characters"),
    contact_number: z
      .string()
      .regex(/^\d{11}$/, "Contact number must be exactly 11 digits"),
    fruits: z
      .array(orderedFruitSchema)
      .min(1, "At least one fruit must be ordered"),
    status: z.nativeEnum(OrderStatus).optional().default(OrderStatus.PENDING),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.nativeEnum(OrderStatus),
  }),
});

export const OrderValidationSchema = {
  create,
  updateStatus,
};
