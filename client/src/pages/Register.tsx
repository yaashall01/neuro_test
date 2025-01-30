import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    fullname: z.string().min(3, "Full Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await dispatch(registerUser({ fullname: data.fullname, email: data.email, password: data.password }));
    if (result.meta.requestStatus === "fulfilled") {
      // alert("User registered successfully!"); 
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <div className="mb-6">
          <img src="/src/assets/logo.png" alt="Neurobase Logo" className="mx-auto h-16" />
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Neurobase</h2>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">Create an account</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("fullname")}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
          </div>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#7f56d9] hover:bg-[#6d4fc7] text-white p-3 rounded-xl transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#e97e88] font-medium hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
