import { ProductType } from "data-fetchers/products";
import Image from "next/image";
import EmptyIMG from "./images/empty-image.png";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

type ProductCardProps = {
  product: ProductType;
};

export function ProductCard({ product }: ProductCardProps) {
  const { _id, title, price, images } = product;
  return (
    <div
      className={
        "hover:shadow-[0_0_20px_rgba(0,0,0,.1)] group p-2 rounded-lg overflow-hidden transition-shadow"
      }
    >
      <Link
        href={`/products/${_id}`}
        className={
          "relative pb-[90%] block overflow-hidden rounded-lg bg-white border border-gray-50"
        }
      >
        <Image
          src={images?.[0] || EmptyIMG}
          alt={"Product image"}
          fill
          className={
            "object-contain group-hover:scale-105 transition-transform duration-500 p-2"
          }
        />
      </Link>
      <div className={"bg-gray-50 pt-4 pb-2 px-2 rounded-lg"}>
        <Link href={`/products/${_id}`} className={"text-lg"}>
          {title}
        </Link>
        <div className={"flex justify-between items-center gap-2 py-2"}>
          <span className={"font-bold text-xl"}>{price}$</span>
          <AddToCartButton id={_id!.toString()} />
        </div>
      </div>
    </div>
  );
}
