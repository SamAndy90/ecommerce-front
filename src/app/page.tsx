import Featured from "components/Featured";
import ProductsList from "components/ProductsList";
import { mongoConnect } from "lib/mongo-connect";
import Product from "models/Product";

export default async function Home() {
  await mongoConnect();
  const featuresProducts = await Product.find({}, null, {
    sort: { updatedAt: -1 },
    limit: 8,
  });

  return (
    <>
      {featuresProducts && <Featured product={featuresProducts[0]} />}
      {featuresProducts && (
        <ProductsList products={featuresProducts} title={"New Arrivals"} />
      )}
    </>
  );
}
