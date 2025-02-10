import Image from "next/image";

interface CardProps {
  title: string;
  price: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, price, image }) => {
  return (
    <div className="text-center cursor-pointer bg-white shadow-md rounded-lg p-4 transform transition hover:scale-105 hover:shadow-lg duration-300">
      {/* Image Container */}
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 relative">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="text-left font-medium text-gray-800 mt-4">{title}</h3>
      <p className="text-sm text-left text-red-500 line-through">Rs:499</p>
      <p className="text-sm text-left text-gray-600">Rs:{price}</p>
    </div>
  );
};

export default Card;
