import Image from "next/image";
import Product from "../componenets/AllProductcard";
import Sortfilter from "../componenets/AllProductSorting";

const Banner: React.FC = () => {
  return (
    <div>
      <div className="relative w-full h-48 sm:h-64 md:h-50 lg:h-60 xl:h-[18rem]">
        {/* Background Image */}
        <Image
          src="/screen.png" // Image path (public folder mein hona chahiye)
          alt="All Products Banner"
          fill // Puri space ko cover karega
          quality={100}
          className="object-cover" // Image full dikhegi bina cut kiye
        />
        {/* Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-black opacity-25"></div>
        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center xm:justify-center md:justify-start md:px-24 md:mt-36">
          <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
            All Products
          </h1>
        </div>
      </div>

      <div>
        <Sortfilter />
      </div>

      <div className="flex flex-col justify-center items-center mb-8">
        <Product />
        <div className="flex justify-center lg:justify-start">
          <button className="h-[56px] bg-[#F9F9F9] px-6 xm:px-20 py-2 text-sm rounded hover:bg-gray-200 transition font-satoshi">
            View collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
