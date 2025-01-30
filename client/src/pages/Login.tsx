import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(loginUser({ email: data.email, password: data.password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <div className="mb-6">
          <img src="/src/assets/logo.png" alt="Neurobase Logo" className="mx-auto h-16" />
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Neurobase</h2>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">Sign in to your account</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <button className="w-full bg-[#7f56d9] hover:bg-[#6d4fc7] text-white p-3 rounded-xl transition duration-300" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-[#e97e88] font-medium hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
