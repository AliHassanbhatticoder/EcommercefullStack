import Section from "../componenets/listing";
import Abbu from "../componenets/feautures";
import NewsletterForm from "../componenets/two-baner";
import Image from "next/image";

export default function About() {
  return (
    <div>
      {/* <div className="flex flex-col justify-center items-center"> */}
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row xl:flex-row items-center text-left md:text-center lg:text-left xl:px-16 py-7 lg:py-12 lg:px-4">
        {/* Text Section */}
        <div className="flex-1 mb-6 lg:mb-0 md:px-8 lg:px-0 px-4">
          <h1 className="font-normal xm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            A brand built on the love of craftsmanship, quality, and outstanding
            customer service
          </h1>
        </div>

        {/* Button Section */}
        <div className="flex justify-center lg:justify-start">
          <button
            className="h-[56px] bg-[#F9F9F9] px-6 py-2 text-sm rounded hover:bg-gray-200 transition font-satoshi"
            aria-label="View our products"
          >
            View our products
          </button>
        </div>
      </div>

      {/* Section Component */}
      <Section />

      {/* Content Section */}
      <div className="flex flex-col md:flex-row">
        {/* Right Section */}
        <div className="w-full md:w-1/2 h-[250px] md:h-[478px] relative">
          <Image
            src="/Image3.jpg"
            alt="Room decor"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px)"
            // className="w-auto h-full object-cover"
          />
        </div>

        {/* Left Section */}
        <div className="bg-[#F9F9F9] text-[#2A254B] p-6 md:p-8 lg:p-12 flex flex-col justify-center items-start w-full md:w-1/2 h-auto md:h-[478px]">
          <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-4">
            Our service isnt just personal, its actually hyper personally
            exquisite
          </h1>
          <div>
            <p className="text-sm sm:text-base md:text-lg mb-4">
              When we started Avion, the idea was simple. Make high-quality
              furniture affordable and available for the mass market.
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-6">
              Handmade, and lovingly crafted furniture and homeware is what we
              live, breathe, and design so our Chelsea boutique became the
              hotbed for the London interior design community.
            </p>
          </div>
          <button
            className="bg-gray-200 text-black px-4 py-2 text-sm md:text-base rounded hover:bg-gray-300 transition font-satoshi"
            aria-label="View collection"
          >
            View collection
          </button>
        </div>
      </div>
      {/* </div> */}

      {/* Abbu Component */}
      <Abbu />

      {/* Newsletter Form Component */}
      <NewsletterForm />
    </div>
  );
}
