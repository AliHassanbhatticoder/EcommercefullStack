import Link from "next/link";
import CategoryNav from "./CategoryNav";
import Home from "./header";

export default function home() {
  return (
    <div>
      <Home />
      {/* Desktop Navigation */}
      <div className="lg:flex xm:hidden items-center h-[64px] bg-[#F9F9F9] gap-[75.5px] justify-center border-t-2">
        <ul className="xm:hidden md:flex lg:flex gap-[32px] items-center text-black font-satoshi">
          <li>
            <Link href="/Allproducts">All products</Link>
          </li>
          <li>
            <CategoryNav />
          </li>
        </ul>
      </div>
    </div>
  );
}
