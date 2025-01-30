/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchProductsApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

const UserDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsApi();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <input
            type="text"
            placeholder="Search products..."
            className="w-full p-3 border rounded-lg mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imgPath={product.imgPath}
                description={product.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

