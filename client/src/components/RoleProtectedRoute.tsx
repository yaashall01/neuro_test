import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Props {
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);

  if (!isAuthenticated) return <Navigate to="/login" />; 
  if (!allowedRoles.includes(role || "")) return <Navigate to="/" />;

  return <Outlet />;
};

export default RoleProtectedRoute;
