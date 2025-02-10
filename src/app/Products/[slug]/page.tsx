// app/Products/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { Produc } from "@/app/componenets/typeofproduct";
import AddToCart from "@/app/componenets/AddToCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await client.fetch<{ slug: string }[]>(
    `*[_type == "product"] { "slug": slug.current }`
  );

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const product: Produc = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
        _id,
        price,
        name,
        description,
        features,
        quantity,
        weight,
        "slug": slug.current,
        "imageurl": image.asset->{
          _id,
          url
        },
        dimensions {  
          depth,
          width,
          height
        }
      }`,
    { slug }
  );

  if (!product) {
    return <div className="p-4 text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AddToCart product={product} />
    </div>
  );
}
