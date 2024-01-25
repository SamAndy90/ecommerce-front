import axios from "axios";
import { ProductType } from "./products";

export const getCartProducts = async (ids: string[]) => {
  return await axios
    .post<ProductType[]>("/api/cart", { ids })
    .then((data) => data.data);
};
