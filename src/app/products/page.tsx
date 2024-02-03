import ProductsList from "components/ProductsList";
import { mongoConnect } from "lib/mongo-connect";
import Product from "models/Product";

export default async function ProductsPage() {
  await mongoConnect();
  const products = await Product.find({}, null, {
    sort: { updatedAt: -1 },
  });
  return (
    products && <ProductsList products={products} title={"All Products"} />
  );
}
