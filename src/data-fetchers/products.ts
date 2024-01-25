import axios from "axios";

export type ProductType = {
  _id?: string;
  title: string;
  category?: string;
  description: string;
  price: number;
  images?: Array<string>;
  properties?: Record<string, string>;
};

// export const getProducts = async () => {
//   return await axios
//     .get<ProductType[]>("/api/products")
//     .then((data) => data.data);
// };

export const getProduct = async (id: string) => {
  return await axios
    .get<ProductType>("/api/products?id=" + id)
    .then((data) => data.data);
};
