"use client";

import { Container } from "common/Container";
import { Title } from "common/Title";
import AddToCartButton from "components/AddToCartButton";
import { getProduct } from "data-fetchers/products";
import Image from "next/image";
import EmptyIMG from "components/images/empty-image.png";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "common/Loader";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const {
    data: product,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(id),
  });

  useEffect(() => {
    isSuccess && !!product.images?.length && setActiveImg(product.images[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <section className={"bg-slate-100 flex-1 py-8"}>
      <Container>
        {isLoading && <Loader />}
        {isSuccess && (
          <div className={"flex gap-8 justify-between"}>
            <div className={"basis-2/5 rounded-xl bg-white p-2 self-start"}>
              <div
                className={
                  "relative pb-[80%] rounded-lg border border-gray-50 overflow-hidden"
                }
              >
                <Image
                  src={activeImg || EmptyIMG}
                  alt={"Product Image"}
                  fill
                  className={"object-contain"}
                />
              </div>
              {product.images && (
                <div className={"mt-2 overflow-x-auto flex gap-0.5"}>
                  {product.images.map((img) => {
                    return (
                      <div
                        onClick={() => setActiveImg(img)}
                        className={clsx(
                          "relative basis-[calc(25%-2px)] shrink-0 pb-[20%] border border-gray-50 rounded-md",
                          { "border-lime-900": img === activeImg }
                        )}
                        key={img}
                      >
                        <Image
                          src={img}
                          alt={"Product image"}
                          fill
                          className={"object-contain p-1"}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div
              className={"bg-white rounded-xl p-8 flex-1 flex flex-col gap-5"}
            >
              <Title>{product.title}</Title>
              <p className={"flex-1"}>{product.description}</p>
              <div className={"flex gap-5 items-center justify-between"}>
                <span className={"font-semibold text-3xl"}>
                  ${product.price}
                </span>
                <AddToCartButton id={id} />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
