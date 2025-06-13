import { Document, Types } from "mongoose";

interface IOrderedFruit {
  fruit: Types.ObjectId;
  quantity: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  CANCELED = "CANCELED",
}

export interface IOrder extends Document {
  customer: Types.ObjectId;
  name: string;
  contact_number: string;
  address: string;
  fruits: IOrderedFruit[];
  status: OrderStatus;
}
