import Abbu from "./componenets/feautures";
import Section from "./componenets/listing";
import Product from "./componenets/HomeProduct";
import NewsletterForm from "./componenets/two-baner";
import Link from "next/link"; // For linking to collection page
import Image from "next/image"; // For image optimization

const HeroImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    // layout="responsive"s
    width={1920} // Adjust according to your design
    height={1080} // Adjust according to your design
    className="w-full h-auto object-cover"
  />
);

export default function Home() {
  return (
    <div>
      <div className="bg-white">
        {/* Desktop Image */}
        <div className="hidden lg:block">
          <HeroImage src="/Hero Blocks.jpg" alt="Luxury homeware collection" />
        </div>

        {/* Content Section */}
        <div className="px-4 py-8 text-center lg:py-16 lg:px-20 lg:hidden">
          <h1 className="text-2xl text-left md:text-center lg:text-4xl font-normal  text-gray-800 ">
            Luxury homeware for people who love timeless design quality
          </h1>
          <p className="mt-4 md:mt-2 text-left md:text-center text-gray-600 text-base lg:text-lg">
            With our new collection, view over 400 bespoke pieces from homeware
            through to furniture today
          </p>
          <Link href="/collection">
            <button className="mt-6 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg shadow-md">
              View collection
            </button>
          </Link>
        </div>

        {/* Mobile Image */}
        <div className="lg:hidden">
          <HeroImage src="/Frame 2.jpg" alt="Luxury homeware collection" />
        </div>
      </div>

      <Abbu />
      <Product />
      <Section />
      <NewsletterForm />
    </div>
  );
}
