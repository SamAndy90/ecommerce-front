"use client";

import { Button } from "common/ui";
import { useCartContext } from "context/cart-context";
import { FaOpencart } from "react-icons/fa";

export type AddToCartButtonProps = {
  id: string;
};

export default function AddToCartButton({ id }: AddToCartButtonProps) {
  const { addProductToCart } = useCartContext();
  return (
    <Button
      onClick={() => addProductToCart(id)}
      size={"small"}
      className={{ button: "flex items-center gap-1 whitespace-nowrap" }}
    >
      <FaOpencart className={"size-5"} /> Add to cart
    </Button>
  );
}
