import axios from "axios";

export type OrderType = {
  fullname: string;
  email: string;
  country: string;
  city: string;
  postalcode: string;
  street: string;
  productsIds: Array<string>;
};

export const postOrder = async (data: OrderType) => {
  return await axios.post("/api/checkout", data).then((data) => data.data);
};
