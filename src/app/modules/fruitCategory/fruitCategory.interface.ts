import { Document } from "mongoose";

export interface IFruitCategory extends Document {
  name: string;
  image: string;
}
