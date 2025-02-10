import Link from "next/link";
import Image from "next/image";
import { category } from "./typeofproduct"; // Assuming the interface is in `types/product.ts`

interface ProductListProps {
  products: category[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 w-full">
      {products.map((product) => (
        <div
          key={product._id}
          className="text-center cursor-pointer bg-white shadow-md rounded-lg p-4 transform transition hover:scale-105 hover:shadow-lg duration-300"
        >
          <Link href={`/Products/${product.slug}`}>
            <div className="w-full h-72 relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-left font-medium text-gray-800 mt-4">
              {product.name}
            </h3>
            <p className="text-sm text-left text-red-500 line-through">
              Rs:499
            </p>
            <p className="text-sm text-left text-gray-600">
              Rs:{product.price}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
