"use client"; // Client-side functionality ke liye
import Image from "next/image";
import React, { useState } from "react";
import { Produc } from "./typeofproduct";
import { useUser, useClerk } from "@clerk/nextjs";

export default function AddToCart({ product }: { product: Produc }) {
  const [tempQuantity, setTempQuantity] = useState(1); // Temporary quantity state

  const { user } = useUser();
  const { openSignIn } = useClerk();

  // Function to handle quantity changes
  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment
      ? Math.min(tempQuantity + 1, product.quantity) // Ensure quantity does not exceed stock
      : Math.max(tempQuantity - 1, 1); // Ensure quantity does not go below 1
    setTempQuantity(newQuantity);
  };

  // Add to cart function
  const addToCart = (product: Produc) => {
    if (!user) {
      openSignIn();
      if (tempQuantity > product.quantity)
        alert(`Only ${product.quantity} items available in stock!`);
      return;
    }

    const updatedPrice = product.price * tempQuantity; // Calculate updated price
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (cart[product._id]) {
      const newCartQuantity = cart[product._id].quantity + tempQuantity;
      if (newCartQuantity > product.quantity) {
        alert(
          `Adding exceeds stock! Only ${product.quantity} items available.`
        );
        return;
      }

      cart[product._id] = {
        ...cart[product._id],
        quantity: newCartQuantity,
        totalPrice: cart[product._id].totalPrice + updatedPrice,
      };
    } else {
      cart[product._id] = {
        ...product,
        quantity: tempQuantity,
        totalPrice: updatedPrice,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.name} added to cart!`);
    setTempQuantity(1); // Reset tempQuantity after adding to cart
  };

  return (
    <div className="max-w-7xl mx-auto w-full border p-6 mb-10 mt-10 bg-gray-50 items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-7xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Image Container */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center ">
          <div className="w-full h-full relative aspect-square">
            {" "}
            {/* Fixed aspect ratio */}
            <Image
              src={product.imageurl?.url}
              alt={product.name}
              fill // Fill the container
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover" // Fit the image inside the container
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-lg md:text-xl font-semibold text-gray-600 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 text-sm md:text-base mb-6">
            {product.description}
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6 text-sm md:text-base">
            {product.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="mb-6">
            <h2 className="text-gray-800 font-medium mb-2">Dimensions</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-gray-600 block text-sm md:text-base">
                  Height:
                </span>
                <p className="text-gray-800">{product.dimensions?.height}</p>
              </div>
              <div>
                <span className="text-gray-600 block text-sm md:text-base">
                  Width:
                </span>
                <p className="text-gray-800">{product.dimensions?.width}</p>
              </div>
              <div>
                <span className="text-gray-600 block text-sm md:text-base">
                  Depth:
                </span>
                <p className="text-gray-800">{product.dimensions?.depth}</p>
              </div>
              <div>
                <span className="text-gray-600 block text-sm md:text-base">
                  width:
                </span>
                <p className="text-gray-800">{product.weight}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Stock:</span>
              <span className="text-green-500 ml-1">
                Available {product.quantity}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(false)} // Decrease quantity
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                -
              </button>
              <input
                type="number"
                value={tempQuantity}
                readOnly
                className="w-12 text-center text-gray-700 bg-transparent border-none"
              />
              <button
                onClick={() => handleQuantityChange(true)} // Increase quantity
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(product)} // Add to cart on click
              className="w-full md:w-auto bg-[#2A254B] text-white py-3 px-6 rounded hover:bg-[#3b327a]"
            >
              Add to cart (${product.price * tempQuantity})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
