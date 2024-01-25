import { Schema, model, models } from "mongoose";

export type OrderDBType = {
  _id?: string;
  fullname: string;
  email: string;
  country: string;
  city: string;
  postalcode: string;
  street: string;
  cart_items: Array<object>;
  paid: boolean;
};

const OrrderSchema = new Schema<OrderDBType>(
  {
    fullname: String,
    email: String,
    country: String,
    city: String,
    postalcode: String,
    street: String,
    cart_items: [Object],
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", OrrderSchema);
