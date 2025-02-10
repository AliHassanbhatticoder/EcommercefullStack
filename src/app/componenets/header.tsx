"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthButtons from "./Authbutton";
import ProfileDropdown from "./profiledropdown";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

interface CartProduct {
  quantity: number;
}

// Helper function to calculate total quantity
const getTotalQuantity = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cart: Record<string, CartProduct> = JSON.parse(storedCart);
      return Object.values(cart).reduce(
        (total, product) => total + product.quantity,
        0
      );
    }
  }
  return 0;
};

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Navbar toggle function
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    const updateCartQuantity = () => {
      setCartQuantity(getTotalQuantity());
    };

    // Update quantity initially
    updateCartQuantity();

    // Listen for storage changes & custom cartUpdated event
    window.addEventListener("storage", updateCartQuantity);
    window.addEventListener("cartUpdated", updateCartQuantity);

    return () => {
      window.removeEventListener("storage", updateCartQuantity);
      window.removeEventListener("cartUpdated", updateCartQuantity);
    };
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden bg-[#2A254B] text-white xm:h-[34px] lg:h-[38px] flex items-center">
        <div className="flex w-full whitespace-nowrap">
          {/* First Text */}
          <motion.div
            className="flex items-center gap-2 text-white xm:text-[10px] lg:text-[14px] leading-[16.2px] font-normal whitespace-nowrap"
            initial={{ x: "-200%" }} // Starts from the right
            animate={{ x: "320%" }} // Moves to the left
            transition={{
              repeat: Infinity,
              duration: 20, // Total duration of the animation
              ease: "linear",
            }}
          >
            <span>
              <Image
                src="/truck2.svg"
                alt="truck"
                width={16}
                height={16}
                className="w-full h-auto object-cover"
              />
            </span>
            <p>
              Free delivery on all orders over £50 with code easter checkout
            </p>
          </motion.div>

          {/* Second Text */}
          <motion.div
            className="flex items-center gap-2 text-white xm:text-[10px] lg:text-[14px] leading-[16.2px] font-normal whitespace-nowrap"
            initial={{ x: "-200%" }} // Starts from the right
            animate={{ x: "320%" }} // Moves to the left
            transition={{
              repeat: Infinity,
              duration: 20, // Must match the first animation
              ease: "linear",
              delay: 10, // Half of the total duration to sync with the first text
            }}
          >
            <span>
              <Image
                src="/truck2.svg"
                alt="truck"
                width={16}
                height={16}
                className="w-full h-auto object-cover"
              />
            </span>
            <p>
              Free delivery on all orders over £50 with code easter checkout
            </p>
          </motion.div>
        </div>
      </div>

      <header className="flex justify-between items-center text-black xm:h-[56px] p-[14px] ">
        <div className="flex">
          <div className="font-clash text-xl">
            <Link href="/" className="logo">
              Avion
            </Link>
          </div>
        </div>

        <div className="flex  md:gap-16">
          <div className="flex items-center gap-[75.5px]">
            <ul className="xm:hidden md:hidden  lg:flex gap-[32px] items-center text-black font-satoshi">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/About">About us</Link>
              </li>
            </ul>
          </div>
          <div className="flex xm:gap-2 md:gap-4 items-center ">
            <div className="  xm:hidden md:block">
              <SearchBar />
            </div>
            <ProfileDropdown />
            <AuthButtons />

            <Link href="/CardPage">
              <button className="relative">
                <Image
                  height={24}
                  width={24}
                  src="/Shopping--cart.svg"
                  alt="shop"
                  className="xm:hidden md:flex"
                />
                {/* Cart Quantity Badge */}
                {cartQuantity > 0 && (
                  <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </Link>

            <div className="xm:flex lg:hidden">
              <button
                className="xm:flex items-center justify-center"
                onClick={handleNavToggle}
                aria-expanded={navOpen ? "true" : "false"}
                aria-controls="mobile-nav"
              >
                <Image
                  height={20}
                  width={20}
                  src="/Menu2.svg"
                  alt="menu"
                  className="xm:hidden md:flex"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {navOpen && (
        <div
          id="mobile-nav"
          className="flex xm:flex-col items-center gap-4 bg-[#F9F9F9] py-4"
        >
          <ul className="text-black text-lg md:flex gap-6 font-satoshi">
            <li>
              <Link href="/Allproducts">All products</Link>
            </li>
            <li>
              <Link href="#">Plant pots</Link>
            </li>
            <li>
              <Link href="#">Ceramics</Link>
            </li>
            <li>
              <Link href="#">Tables</Link>
            </li>
            <li>
              <Link href="#">Chairs</Link>
            </li>
            <li>
              <Link href="#">Crockery</Link>
            </li>
            <li>
              <Link href="#">Tableware</Link>
            </li>
            <li>
              <Link href="#">Cutlery</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
