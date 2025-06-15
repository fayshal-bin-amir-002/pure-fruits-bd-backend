import { Schema, model } from "mongoose";
import { IOrder, OrderStatus } from "./order.interface";

const orderedFruitSchema = new Schema(
  {
    fruit: {
      type: Schema.Types.ObjectId,
      ref: "Fruit",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    address: {
      type: String,
      required: [true, "Customer address is required"],
      trim: true,
      minlength: [2, "Address must be at least 2 characters"],
    },
    contact_number: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^\d{11}$/.test(value);
        },
        message: "Contact number must be exactly 11 digits",
      },
    },
    fruits: {
      type: [orderedFruitSchema],
      required: true,
      validate: [
        (val: any[]) => val.length > 0,
        "At least one fruit is required",
      ],
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
