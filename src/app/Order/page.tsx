"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

interface Order {
  _id: string;
  orderId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  products: {
    name: string;
    price: number;
    quantity: number;
    productId: string;
    image: {
      _id: string;
      url: string;
    };
  }[];
}

export default function OrdersPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const query = `*[_type == "order" && clerkUserId == "${user.id}"]{
        _id,
        orderId,
        totalAmount,
        status,
        createdAt,
        products[]{
          name,
          price,
          quantity,
          productId,
          "image": image.asset->{
        _id,
        url
      },
        }
      }`;

      const data = await client.fetch(query);
      setOrders(data);
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow p-4 bg-white"
            >
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Order ID: {order.orderId}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-lg ${order.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-3">
                {order.products.map((product) => (
                  <div
                    key={product.productId}
                    className="flex items-center space-x-4 border-b pb-3"
                  >
                    <Image
                      src={product.image.url}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md border"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-gray-500 text-sm">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <span className="ml-auto font-semibold">
                      ${product.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3">
                <p className="font-semibold">Total: ${order.totalAmount}</p>
                <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
