import { mongoConnect } from "lib/mongo-connect";
import Product from "models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await mongoConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const products = id
    ? await Product.findOne({ _id: id })
    : await Product.find();

  return NextResponse.json(products);
}
