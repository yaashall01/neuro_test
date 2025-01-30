import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { createProduct } from "../redux/slices/productSlice";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  status: z.enum(["PUBLISHED", "DRAFT"]),
  imgPath: z.string().url("Invalid image URL"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductFormProps {
  onClose: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    await dispatch(createProduct(data));
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">➕ Add New Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Product Name"
              className="w-full p-3 border rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full p-3 border rounded-lg"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <input
              {...register("price")}
              type="text"
              placeholder="Price"
              className="w-full p-3 border rounded-lg"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <select {...register("status")} className="w-full p-3 border rounded-lg">
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          <div>
            <input
              {...register("imgPath")}
              type="text"
              placeholder="Image URL"
              className="w-full p-3 border rounded-lg"
            />
            {errors.imgPath && <p className="text-red-500 text-sm">{errors.imgPath.message}</p>}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
