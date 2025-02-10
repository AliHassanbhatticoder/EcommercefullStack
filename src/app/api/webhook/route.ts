// pages/api/webhook.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Shippo } from "shippo";
import { client } from "@/sanity/lib/client";
import { Produc } from "@/app/componenets/typeofproduct";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const shippoClient = new Shippo({
  apiKeyHeader: `ShippoToken ${process.env.SHIPPO_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});



export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const productsData = JSON.parse(session.metadata?.products || "[]");
      const shippingInfo = JSON.parse(session.metadata?.shippingInfo || "{}");
      const clerkUserId = session.metadata?.clerkUserId;
      const shippoRateId = session.metadata?.shippoRateId ?? "";

      // Validate products data
      const validProducts = productsData.filter((p: Produc) => p.imageRef);
       // Create a Shippo transaction
       const transaction = await shippoClient.transactions.create({
        rate:shippoRateId,
        labelFileType: "PDF",
        async: false,
      });


      await client.create({
        _type: "order",
        orderId: session.id,
        clerkUserId, // Save the Clerk user ID
        products: validProducts.map((product: Produc) => ({
          productId: product._id,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: product.imageRef,
            },
          },
        })),


        shippingInfo,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
        status: "paid",
        trackingId: transaction.trackingNumber,
        labelUrl: transaction.labelUrl,
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("Webhook Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Webhook failed";
  
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
  
}