// components/CategoryNav.tsx
import { client } from "@/sanity/lib/client";
import Link from "next/link";
interface Category {
  name: string;
  slug: string;
}
export default async function CategoryNav() {
  const categories = await client.fetch(`
    *[_type == "category"] {
      name,
      "slug": slug.current
    }
  `);

  return (
    <div className="lg:flex xm:hidden items-center h-[64px] bg-[#F9F9F9] gap-[75.5px] justify-center border-t-2">
      <ul className="xm:hidden md:flex lg:flex gap-[32px] items-center text-black font-satoshi">
        {categories.map((category: Category) => (
          <li key={category.slug}>
            <Link
              href={`/category/${category.slug}`}
              className="hover:text-gray-600 transition-colors"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
