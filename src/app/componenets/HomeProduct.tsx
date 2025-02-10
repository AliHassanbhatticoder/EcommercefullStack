import Link from "next/link"; // Import Link
// import { Product2 } from "./products2";
import Card from "./AllProductCardDesign"; // Card component
import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";

interface IProduct {
  name: string;
  description: string;
  price: string;

  _id: string;
  slug: {
    current: string;
  };
  image: {
    _id: string;
    url: string;
  };
  metadata?: {
    dimensions?: {
      height?: number;
      width?: number;
      aspectRatio?: number;
    };
  };
}

export default async function getProducts() {
  const products = await client.fetch(
    `*[_type=="product"][0...4]{
      _id,
      name,
      description,
      price,
       "slug": slug.current,
     
      "image": image.asset->{
        _id,
        url,
      },
    }`
  );

  return (
    <>
      <div className="bg-white py-12 px-4 lg:px-20">
        <h1 className="font-normal text-3xl py-4">You might also like</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {products.map((product: IProduct) => (
            <Link key={product._id} href={`/Products/${product.slug}`}>
              <Card
                image={product.image.url}
                title={product.name}
                price={product.price}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
