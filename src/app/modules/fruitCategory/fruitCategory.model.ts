import { model, Schema } from "mongoose";
import { IFruitCategory } from "./fruitCategory.interface";

const fruitCategorySchema = new Schema<IFruitCategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Category name must be at least 2 characters long"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FruitCategory = model<IFruitCategory>(
  "FruitCategory",
  fruitCategorySchema
);

export default FruitCategory;
