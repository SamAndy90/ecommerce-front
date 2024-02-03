"use client";

import { Title } from "common/Title";
import { MenuButton } from "common/ui/Buttons/MenuButton";
import { useCartContext } from "context/cart-context";
import { ProductType } from "data-fetchers/products";
import Image from "next/image";

export type CartItemProps = {
  product: ProductType;
};

export default function CartItem({ product }: CartItemProps) {
  const { cartProducts, addProductToCart, removeProductFromCart } =
    useCartContext();
  const { images, title, price, _id } = product;

  return (
    <div
      className={
        "flex sm:flex-row flex-col gap-3 bg-white p-3 transition-colors relative"
      }
    >
      <div className={"basis-1/2 space-y-3 min-h-52"}>
        {!!images?.length && (
          <div
            className={
              "relative pb-[70%] border border-gray-100 rounded-xl bg-white"
            }
          >
            <Image
              src={images[0]}
              alt={"Product Image"}
              fill
              className={"object-contain p-2"}
            />
          </div>
        )}
        <Title className={"text-center"}>{title}</Title>
      </div>
      <div
        className={
          "flex-1 grow-[2] flex md:flex-col-reverse lg:flex-row lg:gap-3 items-center justify-center gap-3 md:gap-1 text-lg font-medium"
        }
      >
        <button
          onClick={() => removeProductFromCart(_id!)}
          disabled={cartProducts.filter((p) => p === _id).length <= 1}
          className={
            "bg-lime-950 hover:bg-lime-900 text-white transition-colors rounded-md size-9 disabled:text-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          }
        >
          -
        </button>
        {cartProducts.filter((p) => p === _id).length}
        <button
          onClick={() => addProductToCart(_id!)}
          className={
            "bg-lime-950 hover:bg-lime-900 text-white transition-colors rounded-md size-9 disabled:text-gray-400 disabled:bg-gray-100"
          }
        >
          +
        </button>
      </div>
      <div
        className={
          "flex-1 flex items-center justify-center font-semibold text-2xl"
        }
      >
        ${cartProducts.filter((p) => p === _id).length * price}
      </div>
      <MenuButton
        id={_id!}
        className={"absolute top-4 right-4 md:top-2 md:right-2"}
      />
    </div>
  );
}
