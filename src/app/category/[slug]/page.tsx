import { client } from "@/sanity/lib/client";
import ProductList from "@/app/componenets/CategoryPage";
// import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await client.fetch<{ slug: string }[]>(
    `*[_type == "category"] {
      "slug": slug.current
    }`
  );

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const products = await client.fetch(
    `*[_type == "product" && category->slug.current == $slug] {
      _id,
      name,
      price,
      description,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }`,
    { slug }
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 capitalize">
        {slug.replace("-", " ")} Products
      </h2>
      <ProductList products={products} />
    </div>
  );
}
