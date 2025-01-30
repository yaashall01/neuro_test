import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const adminEmail = "admin@example.com";
  const adminName = "Admin User";

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <aside className="w-72 h-screen bg-white shadow-lg rounded-r-3xl flex flex-col">
      <div className="p-6 border-b flex flex-col items-center">
        <img src="/src/assets/logo.png" alt="Neurobase Logo" className="h-12" />
        <h1 className="text-xl font-bold mt-2 text-indigo-600">Neurobase Admin</h1>
      </div>

      <div className="p-6 border-b text-center">
        <h2 className="text-lg font-semibold">{adminName}</h2>
        <p className="text-gray-500 text-sm">{adminEmail}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-2">
            <Link
              to="/admin/products"
              className={`block p-3 rounded-lg transition ${
                location.pathname === "/admin/products"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-indigo-100"
              }`}
            >
              📦 Product Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`block p-3 rounded-lg transition ${
                location.pathname === "/admin/users"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-indigo-100"
              }`}
            >
              👥 User Management
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
