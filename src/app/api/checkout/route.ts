// pages/api/checkout.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Shippo } from "shippo";
import { Produc } from "@/app/componenets/typeofproduct";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const shippoClient = new Shippo({
  apiKeyHeader: `ShippoToken ${process.env.SHIPPO_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { products, clerkUserId, shippingInfo } = body;

    if (!products?.length || !shippingInfo || !clerkUserId) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Fetch real-time shipping rates from Shippo
    const shipment = await shippoClient.shipments.create({
      addressFrom: {
        name: "Your Store",
        street1: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zip: "94107",
        country: "US",
      },
      addressTo: {
        name: shippingInfo.name,
        street1: shippingInfo.street1,
        street2: shippingInfo.street2,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip: shippingInfo.zip,
        country: shippingInfo.country,
        phone: shippingInfo.phone,
      },
      parcels: [
        {
          length: "10",
          width: "8",
          height: "4",
          distanceUnit: "in",
          weight: "2",
          massUnit: "lb",
        },
      ],
      async: false,
    });

    if (!shipment.rates || shipment.rates.length === 0) {
      return NextResponse.json(
        { error: "No shipping rates available" },
        { status: 400 }
      );
    }

    // Select the first available rate (you can let the user choose)
    const selectedRate = shipment.rates[0];

    // Prepare line items for Stripe
    const lineItems = products.map((product: Produc) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.imageurl.url],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
      metadata: {
        clerkUserId,
        shippingInfo: JSON.stringify(shippingInfo),
        products: JSON.stringify(
          products.map((product: Produc) => ({
            _id: product._id,
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            weight: product.weight || 1,
            imageRef: product.imageurl._id,
          }))),
        shippoRateId: selectedRate.objectId, // Save the selected rate ID
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(parseFloat(selectedRate.amount) * 100),
              currency: selectedRate.currency,
            },
            display_name: selectedRate.provider,
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Checkout Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Checkout failed";
  
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}