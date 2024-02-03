"use client";

import { Container } from "common/Container";
import { Title } from "common/Title";
import OrderForm from "components/OrderForm";
import Cart from "components/Cart";
import { useCartContext } from "context/cart-context";
import Link from "next/link";
import { Button } from "common/ui";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Success from "components/Success";

export default function CartPage() {
  const { cartProducts, clearCart } = useCartContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has("success")) {
      const ind = setTimeout(() => {
        clearCart();
      }, 0);
      const ind1 = setTimeout(() => {
        router.push("/");
      }, 5000);
      return () => {
        clearTimeout(ind);
        clearTimeout(ind1);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (searchParams.has("success")) {
    return <Success />;
  }
  return (
    <section className={"py-8 bg-gray-100 flex-1"}>
      <Container>
        {!!cartProducts.length ? (
          <div className={"flex gap-8 md:gap-4 xl:gap-8 flex-col md:flex-row"}>
            <div className={"flex-1 space-y-3"}>
              <Title className={"font-semibold text-3xl"}>Cart</Title>
              <Cart />
            </div>
            <div className={"space-y-3"}>
              <Title className={"text-center font-semibold text-3xl"}>
                Order information
              </Title>
              <OrderForm />
            </div>
          </div>
        ) : (
          <div
            className={
              "flex flex-col items-center gap-4 rounded-3xl bg-white mx-auto max-w-screen-lg py-28 md:py-32 lg:py-40 px-2"
            }
          >
            <p className={"text-4xl md:text-5xl font-semibold text-center"}>
              Your Cart is Empty
            </p>
            <p className={"text-2xl md:text-3xl font-medium text-center"}>
              But you can still fix it
            </p>
            <Link href={"/products"}>
              <Button colorVariant={"primary"}>Go to products</Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
