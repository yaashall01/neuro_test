import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateUser } from "../redux/slices/userSlice";

const userSchema = z.object({
  fullname: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  roles: z.enum(["ROLE_ADMIN", "ROLE_USER"]),
});

type UserFormData = z.infer<typeof userSchema>;

interface EditUserFormProps {
  user: UserFormData & { id: number };
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    setValue("fullname", user.fullname);
    setValue("email", user.email);
    setValue("roles", user.roles[0] as "ROLE_ADMIN" | "ROLE_USER"); 
}, [user, setValue]);

  const onSubmit = async (data: UserFormData) => {
    await dispatch(updateUser({ userId: user.id, userData: { ...data, roles: [data.roles] } }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">✏️ Edit User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("fullname")}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <select {...register("roles")} className="w-full p-3 border rounded-lg">
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
            {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
