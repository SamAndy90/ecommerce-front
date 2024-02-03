import { mongoConnect } from "lib/mongo-connect";
import Order from "models/Order";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK || "");

export async function POST(req: Request) {
  await mongoConnect();
  const bufData = Buffer.from(await req.arrayBuffer());

  const endpointSecret =
    "whsec_bd9a49c642a57db7e548dd4773d79697a94810e77b7a5a5178a9f8a6a625009d";
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(bufData, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ` + err },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const id = data.metadata?.orderId;
      const paid = data.payment_status === "paid";
      if (paid && id)
        await Order.findByIdAndUpdate(id, {
          paid,
        });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ status: 200 });
}

// awards-steady-pride-zeal
// account id acct_1ObltNDOdrHPP7ID
