// pages/checkout/form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Required by DHL and other carriers
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "US", // Default to US, but allow changes
    company: "", // Optional field
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save form data to localStorage or context for later use
      localStorage.setItem("shippingInfo", JSON.stringify(formData));

      // Redirect to Stripe payment page
      router.push("/checkout/payment");
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Shipping Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="street1"
            placeholder="Street Address 1"
            value={formData.street1}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="street2"
            placeholder="Street Address 2"
            value={formData.street2}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="company"
            placeholder="Company (Optional)"
            value={formData.company}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-md ${
            loading ? "opacity-50" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}
