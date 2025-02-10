"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const debounceTimer = setTimeout(async () => {
        const response = await fetch(
          `/api/Search?q=${encodeURIComponent(query)}`
        );
        const products = await response.json();
        setResults(products);
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div className="relative w-64" ref={ref}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.map((product) => (
            <Link
              key={product._id}
              href={`/Products/${product.slug}`}
              className="flex items-center p-3 hover:bg-gray-100 transition-all cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={40}
                height={40}
                className="w-10 h-10 object-cover rounded mr-3"
              />
              <div>
                <p className="font-medium text-[#2A254B]">{product.name}</p>
                <p className="text-sm text-gray-600">£{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
