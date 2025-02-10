import Link from "next/link";
import Card from "./AllProductCardDesign";
import { client } from "@/sanity/lib/client";

interface IProduct {
  name: string;
  description: string;
  price: string;
  imageurl: {
    _id: string;
    url: string;
  };
  _id: string;
  slug: {
    current: string;
  };
}

export default async function getProducts() {
  const products = await client.fetch(
    `*[_type=="product"]{
      _id,
      name,
      description,
      price,
       "slug": slug.current,
      "imageurl": image.asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
    }`
  );

  return (
    <>
      <div className="bg-white py-12 px-4 lg:px-20 w-full">
        <h1 className="font-normal text-3xl py-4">You might also like</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: IProduct) => (
            <Link key={product._id} href={`/Products/${product.slug}`}>
              <Card
                image={product.imageurl?.url}
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
