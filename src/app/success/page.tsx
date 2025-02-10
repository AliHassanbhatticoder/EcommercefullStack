"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { client } from "@/sanity/lib/client";
import { Order } from "../componenets/typeofproduct"; // Assuming interfaces are in `types/order.ts`

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const query = `*[_type == "order" && clerkUserId == $userId] | order(createdAt desc)`;
        const orders: Order[] = await client.fetch(query, { userId });
        setOrders(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading orders...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Orders
      </h1>
      {orders.length > 0 ? (
        <>
          <p className="text-center text-green-600 font-medium mb-4">
            Orders loaded successfully!
          </p>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  Order ID:
                  <span
                    className="truncate block w-40 overflow-hidden text-ellipsis"
                    title={order.orderId}
                  >
                    {order.orderId.slice(0, 10)}...{order.orderId.slice(-5)}
                  </span>
                </h2>
                <p className="text-gray-600">
                  Total Amount:{" "}
                  <span className="font-medium">${order.totalAmount}</span>
                </p>
                <p
                  className={`text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {order.status}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Products:
                  </h3>
                  <div className="space-y-2 mt-2">
                    {order.products.map((product) => (
                      <div
                        key={product._id}
                        className="border p-3 rounded-md bg-gray-100"
                      >
                        <p className="text-gray-700 font-medium">
                          {product.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Price: ${product.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
}
