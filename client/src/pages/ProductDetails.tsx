/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductByIdApi } from "../api/productApi";
import Header from "../components/Header";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductByIdApi(id!);
        console.log("Product data ::::", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) return <p className="text-center text-gray-600 mt-10">Product not found.</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6 max-w-4xl">
        <button onClick={() => navigate(-1)} className="text-indigo-600 hover:underline mb-4 ">
          ← Go Back
        </button>

        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
          <img src={product.imgPath} alt={product.name} className="w-full md:w-1/2 rounded-lg object-cover" />
          <div className="md:ml-6 mt-4 md:mt-0 flex-1">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-2xl font-semibold text-indigo-600 mt-4">${parseFloat(product.price || "0").toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
