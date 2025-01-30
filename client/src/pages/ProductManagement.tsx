/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchAllProducts, deleteProduct } from "../redux/slices/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddProductForm from "../components/AddProductForm";
import EditProductForm from "../components/EditProductForm";

const ProductManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🛠️ Product Management</h2>

      <button 
        onClick={() => setShowAddForm(true)} 
        className="mb-4 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
      >
        ➕ Add New Product
      </button>

      {loading && <p className="text-center text-indigo-500">Loading products...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-y-auto max-h-[360px] rounded-lg shadow-lg mt-4">
        <table className="w-full bg-white border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 p-6">No products available.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 border-b">
                    <img src={product.imgPath} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                  </td>
                  <td className="p-4 border-b">{product.name}</td>
                  <td className="p-4 border-b">${parseFloat(product.price).toFixed(2)}</td>
                  <td className="p-4 border-b">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        product.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                  <td className="p-4 border-b text-center space-x-4">
                    <button onClick={() => setEditProduct(product)} className="text-yellow-500 hover:text-yellow-600 transition">
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-600 transition">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} />}
      {editProduct && <EditProductForm product={editProduct} onClose={() => setEditProduct(null)} />}
    </div>
  );
};

export default ProductManagement;
