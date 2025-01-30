import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 ">
      <AdminSidebar />

      <main className="flex-1 p-6">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminDashboard;
