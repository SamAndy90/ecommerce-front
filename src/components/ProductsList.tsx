import { Container } from "common/Container";
import { Title } from "common/Title";
import { ProductType } from "data-fetchers/products";
import { ProductCard } from "./ProductCard";

type ProductsListProps = {
  products: ProductType[];
  title?: string;
};

export default function ProductsList({ products, title }: ProductsListProps) {
  return (
    <section className={"py-8"}>
      <Container>
        <div>
          <Title className={"text-3xl font-semibold"}>{title}</Title>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-x-2 md:gap-x-1 xl:gap-x-4 py-8"
            }
          >
            {products.map((p) => {
              return <ProductCard product={p} key={p._id} />;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
