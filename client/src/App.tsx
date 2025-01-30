import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import ProductManagement from "./pages/ProductManagement";
import UserManagement from "./pages/UserManagement";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? (role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/user-dashboard" />) : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User routes */}
        <Route element={<RoleProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        {/* Admin route */}
        <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="products" element={<ProductManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
