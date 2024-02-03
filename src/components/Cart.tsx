"use client";

import { useCartContext } from "context/cart-context";
import { getCartProducts } from "data-fetchers/cart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItem from "./CartItem";
import { Loader } from "common/Loader";

export default function Cart() {
  const { cartProducts } = useCartContext();
  // const client = useQueryClient();
  // const router = useRouter();

  const {
    data: products,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["added-products", cartProducts.length],
    queryFn: () => getCartProducts(cartProducts),
    // keepPrevious
    // enabled: !!cartProducts.length,
  });

  useEffect(() => {
    // client.invalidateQueries({ queryKey: ["added-products"] });
    // router.refresh();
  }, [cartProducts]);

  return (
    <div className={"bg-white rounded-2xl overflow-hidden"}>
      <div
        className={
          "hidden sm:flex text-zinc-500 font-semibold text-lg px-3 pt-6 pb-4"
        }
      >
        <span className={"basis-1/2 border-b pb-1"}>PRODUCT</span>
        <span className={"flex-1 grow-[2] border-b pb-1"}>QUANTITY</span>
        <span className={"flex-1 border-b pb-1"}>PRICE</span>
      </div>
      {isLoading && <Loader />}
      {isSuccess &&
        products.map((p) => {
          return <CartItem key={p._id} product={p} />;
        })}
      {isSuccess && (
        <div
          className={"p-3 sm:p-5 font-semibold text-xl sm:text-2xl text-right"}
        >
          <span className={"mr-4"}>Total:</span>$
          {products.reduce((acc, p) => {
            const amount = cartProducts.filter((id) => id === p._id).length;
            return (acc += p.price * amount);
          }, 0)}
        </div>
      )}
    </div>
  );
}
