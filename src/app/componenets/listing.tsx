import React from "react";
import Image from "next/image"; // Import Image component

const Section: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 py-12 px-4 lg:px-20 ">
      {/* Left Section */}
      <div className="bg-[#2c2c54] text-white p-8 flex flex-col justify-center items-start w-full md:w-1/2 md:h-[478px] xm:h-[281px]">
        <h2 className="text-2xl md:text-3xl  mb-4">
          It started with a small idea
        </h2>
        <p className="text-base md:text-lg mb-6">
          A global brand with local beginnings, our story began in a small
          studio in South London in early 2014.
        </p>
        <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition font-satoshi">
          View collection
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 md:h-[478px] xm:h-[281px] relative">
        {/* Use Image component for optimization */}
        <Image
          src="/Image Block.jpg"
          alt="Room decor"
          // width={1920} // Specify width and height
          // height={478}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px)"
          fill
          className="w-auto h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Section;
