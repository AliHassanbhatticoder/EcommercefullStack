// pages/checkout/payment.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // Import useAuth from Clerk

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userId } = useAuth(); // Get the Clerk user ID

  useEffect(() => {
    const handlePayment = async () => {
      setLoading(true);

      try {
        // Fetch the shipping info from localStorage
        const shippingInfo = JSON.parse(
          localStorage.getItem("shippingInfo") || "{}"
        );

        // Fetch the selected products from localStorage
        const storedCart = localStorage.getItem("cart");
        const selectedProducts = storedCart ? JSON.parse(storedCart) : {};

        // Prepare the payload for the Stripe checkout session
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: Object.values(selectedProducts),
            shippingInfo,
            clerkUserId: userId, // Include the Clerk user ID
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Redirect to Stripe payment page
          window.location.href = data.url;
        } else {
          console.error("Checkout failed:", data.error);
          alert("Checkout failed: " + data.error);
        }
      } catch (error) {
        console.error("Payment error:", error);
        alert("An error occurred during payment.");
      } finally {
        setLoading(false);
      }
    };

    handlePayment();
  }, [router, userId]); // Add userId to the dependency array

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Processing Payment...</h1>
      {loading && <p>Please wait while we process your payment.</p>}
    </div>
  );
}
