import { ProductType } from "data-fetchers/products";
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema<ProductType>({
  title: { type: String, require: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: String,
  price: { type: Number, require: true },
  images: Array(String),
  properties: Object,
});

export default models.Product || model("Product", ProductSchema);
