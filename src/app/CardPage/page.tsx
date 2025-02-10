"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Produc } from "../componenets/typeofproduct";
import { FaTrash } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";

const ShoppingCart = () => {
  const [products, setProducts] = useState<Produc[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("cart");
      setProducts([]);
      setSelectedProducts([]);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const value = JSON.parse(storedCart);
          const items = Object.values(value) as Produc[];
          setProducts(items);
        } catch (error) {
          console.error("Error parsing cart data:", error);
          localStorage.removeItem("cart"); // Crucial: Remove corrupted data
        }
      }
    }
  }, []);

  // Cart update karne ke liye helper function
  const updateCart = (updatedProducts: Produc[]) => {
    const cart = updatedProducts.reduce(
      (acc, product) => ({ ...acc, [product._id]: product }),
      {}
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    setProducts(updatedProducts);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Quantity increment
  const incrementQuantity = (id: string) => {
    const updatedProducts = products.map((product) =>
      product._id === id
        ? {
            ...product,
            quantity: product.quantity + 1,
            totalPrice: product.price * (product.quantity + 1),
          }
        : product
    );
    updateCart(updatedProducts);
  };

  // Quantity decrement
  const decrementQuantity = (id: string) => {
    const updatedProducts = products.map((product) =>
      product._id === id && product.quantity > 1
        ? {
            ...product,
            quantity: product.quantity - 1,
            totalPrice: product.price * (product.quantity - 1),
          }
        : product
    );
    updateCart(updatedProducts);
  };

  // Ek product delete karna
  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((product) => product._id !== id);
    updateCart(updatedProducts);
    setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
  };

  // Sab products delete karna
  const deleteAllProducts = () => {
    if (confirm("Are you sure you want to delete all products?")) {
      localStorage.removeItem("cart");
      setProducts([]);
      setSelectedProducts([]);
      alert("All products have been deleted!");
    }
  };

  // Selected products ke liye subtotal calculate karna
  const calculateSubtotal = () =>
    products
      .filter((product) => selectedProducts.includes(product._id))
      .reduce((total, product) => total + product.price * product.quantity, 0);

  // Product select/deselect karna
  const handleProductSelect = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  // "Select All" functionality
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product._id));
    }
  };

  // components/ShoppingCart.tsx

  const handleCheckout = async () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to proceed to checkout.");
      return;
    }
    setLoading(true); // Set loading to true before the asynchronous operation

    try {
      // Simulate an async operation (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect after successful checkout (or your API call completes)
      window.location.href = "/checkout/form";
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error during checkout. Please try again.");
    } finally {
      setLoading(false); // Set loading to false, regardless of success or failure
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto w-full border p-6 mb-10 shadow-lg bg-white rounded-lg">
        <h1 className="text-2xl mb-6">Your Shopping Cart</h1>
        <p className="text-sm text-gray-500 mb-4">
          Total Products: {products.length}
        </p>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 text-gray-500 text-sm border-b pb-4 mb-4 font-clash">
            <span className="col-span-1">Select</span>
            <span className="col-span-2">Product</span>
            <span className="hidden md:block">Quantity</span>
            <span className="text-right col-span-1">Total</span>
          </div>

          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-4 md:grid-cols-6 gap-4 items-center font-satoshi"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleProductSelect(product._id)}
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex col-span-2 items-center gap-4">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={product.imageurl.url}
                      alt={product.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">£{product.price}</p>
                  </div>
                </div>

                <div className="hidden md:block text-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementQuantity(product._id)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={product.quantity}
                      readOnly
                      className="w-12 text-center text-gray-700 bg-transparent border-none"
                    />
                    <button
                      onClick={() => incrementQuantity(product._id)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="text-right">
                  £{(product.price * product.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                >
                  <FaTrash className="text-xl" />
                  <span>Delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Select All Button */}
        <div className="mt-4">
          <button
            onClick={handleSelectAll}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition font-satoshi"
          >
            {selectedProducts.length === products.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>

        {/* Subtotal and Checkout */}
        <div className="mt-6 text-right">
          <p className="text-lg font-clash">
            Subtotal: £{calculateSubtotal().toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Taxes and shipping are calculated at checkout.
          </p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`mt-4 ${
              loading ? "bg-gray-400" : "bg-[#2A254B] hover:bg-[#1c1836]"
            } text-white py-2 px-6 rounded transition font-satoshi`}
          >
            {loading ? "Processing..." : "Go to checkout"}
          </button>
        </div>

        {/* Delete All Products */}
        {products.length > 0 && (
          <div className="mt-6">
            <button
              onClick={deleteAllProducts}
              className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition font-satoshi"
            >
              Delete All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;

// ... rest of the component remains the same
