"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Home, ShoppingBag, Menu } from "lucide-react";
interface SearchProduct {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // 🔹 Fetch products when user types in search
  useEffect(() => {
    if (query.trim()) {
      const debounceTimer = setTimeout(async () => {
        const response = await fetch(
          `/api/Search?q=${encodeURIComponent(query)}`
        );
        const products = await response.json();
        setResults(products);
        setIsSearchOpen(true);
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setResults([]);
      setIsSearchOpen(false);
    }
  }, [query]);

  // 🔹 Close Search & Sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        overlayRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setIsSidebarOpen(false);
      }
    };

    if (isSearchOpen || isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen, isSidebarOpen]);

  return (
    <div className="xm:flex md:hidden">
      {/* 🔹 Background Overlay */}
      {(isSearchOpen || isSidebarOpen) && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-40 "
        ></div>
      )}

      {/* 🔹 Sidebar Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-5 z-60 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
        <p className="text-lg font-bold">Sidebar Menu</p>
        <ul className="mt-4">
          <li className="py-2">
            <Link href="/">Home</Link>
          </li>
          <li className="py-2">
            <Link href="/About">About Us</Link>
          </li>
          <li className="py-2">
            <Link href="/Allproducts">Products</Link>
          </li>
        </ul>
      </div>

      {/* 🔹 Search Overlay */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-10 bg-white transform transition-transform duration-300 z-1 ${
          isSearchOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
            autoFocus
          />
          <div className="mt-2 w-full bg-white border rounded-lg shadow-lg max-h-[calc(100vh-180px)] overflow-y-auto">
            {results.length > 0
              ? results.map((product) => (
                  <Link
                    key={product._id}
                    href={`/Products/${product.slug}`}
                    className="flex items-center p-3 hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded mr-3"
                    />
                    <div>
                      <p className="font-medium text-[#2A254B]">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">£{product.price}</p>
                    </div>
                  </Link>
                ))
              : query.trim() && (
                  <p className="p-3 text-gray-600">No products found</p>
                )}
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t flex justify-around items-center py-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center text-gray-700"
        >
          <Menu size={24} />
          <span className="text-xs">Menu</span>
        </button>

        <Link href="/" className="flex flex-col items-center text-gray-700">
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>

        <button
          onClick={() => setIsSearchOpen((prev) => !prev)}
          className="flex flex-col items-center text-gray-700"
        >
          <Search size={24} />
          <span className="text-xs">Search</span>
        </button>

        <Link
          href="/CardPage"
          className="flex flex-col items-center text-gray-700"
        >
          <ShoppingBag size={24} />
          <span className="text-xs">Cart</span>
        </Link>
      </div>
    </div>
  );
}
