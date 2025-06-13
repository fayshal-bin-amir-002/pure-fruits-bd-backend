import { Document, Types } from "mongoose";

export enum UnitType {
  KG = "kg",
  PIECE = "piece",
}

export interface IFruit extends Document {
  name: string;
  image: string;
  regular_price: number;
  offer_price: number;
  inStock: boolean;
  description: string;
  unit: UnitType;
  quantity: number;
  category: Types.ObjectId;
}
