import { OrderType } from "data-fetchers/order";
import { ProductType } from "data-fetchers/products";
import { mongoConnect } from "lib/mongo-connect";
import Order from "models/Order";
import Product from "models/Product";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK || "");

export async function POST(req: Request) {
  await mongoConnect();

  const { productsIds, ...rest }: OrderType = await req.json();
  const uniqueIds = Array.from(new Set(productsIds));

  const products: ProductType[] = await Product.find({ _id: uniqueIds });

  const cart_items = [];

  for (let id of uniqueIds) {
    const product = products.find((p) => p._id!.toString() === id);
    const quantity = productsIds.filter(
      (id) => id === product?._id!.toString()
    ).length;
    if (quantity && product) {
      cart_items.push({
        quantity,
        price_data: {
          currency: "USD",
          unit_amount: product.price * 100,
          product_data: {
            name: product.title,
          },
        },
      });
    }
  }

  const orderDoc = await Order.create({ ...rest, cart_items, paid: false });

  const session = await stripe.checkout.sessions.create({
    line_items: cart_items,
    mode: "payment",
    customer_email: rest.email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
  });

  return NextResponse.json({ URL: session.url });
  // redirect(session.url!);
}
