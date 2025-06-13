import { model, Schema } from "mongoose";
import { IFruit, UnitType } from "./fruit.interface";

const fruitSchema = new Schema<IFruit>(
  {
    name: {
      type: String,
      required: [true, "Fruit name is required"],
      trim: true,
      minlength: [2, "Fruit name must be at least 2 characters long"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    regular_price: {
      type: Number,
      required: [true, "Regular price is required"],
      min: [0.01, "Regular price must be positive"],
    },
    offer_price: {
      type: Number,
      required: [true, "Offer price is required"],
      min: [0.01, "Offer price must be positive"],
      validate: {
        validator: function (this: IFruit, value: number) {
          return value <= this.regular_price;
        },
        message: "Offer price must not exceed regular price",
      },
    },
    inStock: {
      type: Boolean,
      required: [true, "Stock status is required"],
      default: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    unit: {
      type: String,
      enum: Object.values(UnitType),
      required: [true, "Unit type is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be positive"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "FruitCategory",
      required: [true, "Category is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Fruit = model<IFruit>("Fruit", fruitSchema);

export default Fruit;
