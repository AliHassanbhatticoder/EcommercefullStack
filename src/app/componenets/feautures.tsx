import React from "react";
import Image from "next/image"; // Next.js Image component

const Abbu: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Brand Features Section */}
      <div className="py-12 px-4 lg:px-20 text-center">
        <h1 className="text-xl lg:text-2xl  text-gray-800 mb-8">
          What makes our brand different
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "/truck.svg", // Path to the SVG file
              title: "Next day as standard",
              description:
                "Order before 3pm and get your order the next day as standard",
            },
            {
              icon: "/sahi.svg",
              title: "Made by true artisans",
              description:
                "Handmade crafted goods made with real passion and craftsmanship",
            },
            {
              icon: "/purchase.svg",
              title: "Unbeatable prices",
              description:
                "For our materials and quality you won’t find better prices anywhere",
            },
            {
              icon: "/phool.svg",
              title: "Recycled packaging",
              description:
                "We use 100% recycled to ensure our footprint is more manageable",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 text-left"
            >
              <div
                className="text-3xl mb-4 flex justify-start items-center" // Changed from justify-center to justify-start for left align
                aria-label={item.title} // Accessibility ke liye
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={30}
                  height={40}
                  className="w-auto h-auto object-cover"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2 text-left">
                {" "}
                {/* Ensured left alignment for title */}
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 text-left">
                {" "}
                {/* Ensured left alignment for description */}
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Abbu;
