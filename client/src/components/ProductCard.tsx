import { Link } from "react-router-dom";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  imgPath: string;
  description: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, imgPath, description }) => {
  return (
    <Link to={`/product/${id}`} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img src={imgPath} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-sm text-gray-600 mt-1">{description.length > 50 ? description.substring(0, 50) + "..." : description}</p>
      <p className="text-gray-800 font-semibold mt-2">${parseFloat(price).toFixed(2)}</p>
    </Link>
  );
};

export default ProductCard;
