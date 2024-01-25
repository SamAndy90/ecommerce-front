import { Container } from "common/Container";
import { Title } from "common/Title";
import { LinkButton } from "common/ui";
import { ProductType } from "data-fetchers/products";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export type FeaturedProps = {
  product: ProductType;
};
export default function Featured({ product }: FeaturedProps) {
  const { _id, title, description, images } = product;

  return (
    product && (
      <section
        className={"bg-gradient-to-r from-slate-900 to-zinc-900 text-white"}
      >
        <Container>
          <div className={"flex justify-between items-center py-12 gap-8 "}>
            <div className={"flex flex-col gap-8 basis-1/2"}>
              <Title component={"h1"} className={"text-7xl"}>
                {title}
              </Title>
              <p className={"leading-relaxed text-gray-300"}>{description}</p>
              <div className={"flex gap-8"}>
                <Link href={"/products/" + _id}>
                  <LinkButton colorVariant={"outline"}>Read more</LinkButton>
                </Link>
                <AddToCartButton id={_id!.toString()} />
              </div>
            </div>
            {images && (
              <div
                className={
                  "basis-1/3 grow relative rounded-xl self-stretch overflow-hidden min-h-80"
                }
              >
                <Image
                  src={images[1]}
                  alt={"Featured product image"}
                  fill
                  className={"object-cover"}
                />
              </div>
            )}
          </div>
        </Container>
      </section>
    )
  );
}
