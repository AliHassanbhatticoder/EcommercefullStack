import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#2C2543] text-white py-10">
      {/* Container */}
      <div className="container mx-auto px-6">
        {/* Mobile Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-xl mb-4">Avion</h2>
            <p className="text-sm flex flex-col gap-2">
              <span>21 New York Street</span>
              <span>New York City</span>
              <span> United States of America</span>
              <span>43234</span>
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="font-clash text-sm mb-3">Social links</h2>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="hover:text-gray-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </Link>
              <Link
                href="#"
                className="hover:text-gray-300"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </Link>
              <Link
                href="#"
                className="hover:text-gray-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                href="#"
                className="hover:text-gray-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                href="#"
                className="hover:text-gray-300"
                aria-label="Pinterest"
              >
                <i className="fab fa-pinterest"></i>
              </Link>
              <Link href="#" className="hover:text-gray-300" aria-label="Skype">
                <i className="fab fa-skype"></i>
              </Link>
            </div>
          </div>

          {/* Our Company */}
          <div>
            <h3 className=" text-sm mb-3">Our company</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Vacancies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Returns policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3 className=" text-sm mb-3">Menu</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400">
                  New arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Best deals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Recently viewed
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Popular this week
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  All products
                </Link>
              </li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h3 className=" text-sm mb-3">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Cookery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Homewares
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Plant pots
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Crockery
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>Copyright 2022 Avion LTD</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
