import { Container } from "common/Container";
import ProductsList from "components/ProductsList";
import { mongoConnect } from "lib/mongo-connect";
import Product from "models/Product";

export default async function ProductsPage() {
  await mongoConnect();
  const products = await Product.find({}, null, {
    sort: { updatedAt: -1 },
  });
  return (
    <section>
      <Container>
        <div>
          {products && (
            <ProductsList products={products} title={"All Products"} />
          )}
        </div>
      </Container>
    </section>
  );
}
