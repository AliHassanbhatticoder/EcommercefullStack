"use client"; // Mark this component as a Client Component

import { useState, useRef, useEffect } from "react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function ProfileDropdown() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  const handleLogout = () => {
    signOut().then(() => {
      window.location.href = "/";
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverCard: {
                display: "none", // Hide Clerk's default menu
              },
            },
          }}
        />
      </div>
      {isSignedIn && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* z-50 ensures the dropdown appears above other content */}
          <Link
            href="/manage-account"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Manage My Account
          </Link>
          <Link
            href="/Order"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            My Orders
          </Link>
          <Link
            href="/my-wishlist"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            My Wishlist
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
