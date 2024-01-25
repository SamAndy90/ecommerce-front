import { mongoConnect } from "lib/mongo-connect";
import Product from "models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await mongoConnect();

  const { ids } = await req.json();
  const products = await Product.find({ _id: ids });

  return NextResponse.json(products);
}
