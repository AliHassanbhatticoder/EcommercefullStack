import React from "react";
import Image from "next/image";

const NewsletterForm = () => {
  const features = [
    { image: "/rightt.svg", label: "Exclusive offers" },
    { image: "/rightt.svg", label: "Free events" },
    { image: "/rightt.svg", label: "Large discounts" },
  ];

  return (
    <section className="bg-cover bg-center h-[400px] relative">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/sectionpapa.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-screen-md mx-auto px-4 pt-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl ">
          Join the club and get the benefits
        </h2>
        <p className="mt-4 text-sm md:text-base lg:text-lg">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pre-shop events, and more.
        </p>

        {/* List of benefits */}
        <ul className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 text-white mb-6 mt-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-6 h-6  rounded-full text-black">
                <Image
                  src={feature.image}
                  alt={feature.label}
                  width={16}
                  height={16}
                  className="w-full h-auto object-cover"
                />
              </span>
              <span className="text-sm md:text-base font-satoshi">
                {feature.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Newsletter form */}
        <form className="mt-6 flex flex-col xm:flex-row justify-center items-center">
          <input
            type="email"
            placeholder="your@email.com"
            className="p-2 w-full xm:w-[70%] lg:w-[50%] md:w-[60%] font-satoshi text-black  focus:outline-none"
          />
          <button className="p-2 mt-4 xm:mt-0 w-full xm:w-auto bg-[#2A254B] text-white hover:bg-[#3b327a] font-satoshi">
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
