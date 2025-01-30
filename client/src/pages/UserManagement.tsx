/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUsers, deleteUser } from "../redux/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddUserForm from "../components/AddUserForm";
import EditUserForm from "../components/EditUserForm";

const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const authUserId = useSelector((state: RootState) => state.auth.userId);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId: number) => {
    if (userId === authUserId) {
      alert("You cannot delete yourself!");
      return;
    }
    dispatch(deleteUser(userId));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">👥 User Management</h2>

      <button 
        onClick={() => setShowAddForm(true)} 
        className="mb-4 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
      >
        ➕ Add New User
      </button>

      {loading && <p className="text-center text-indigo-500">Loading users...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-y-auto max-h-[460px] rounded-lg shadow-lg mt-4">
        <table className="w-full bg-white border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="p-4">Full Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 p-6">No users available.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 border-b">{user.fullname}</td>
                  <td className="p-4 border-b">{user.email}</td>
                  <td className="p-4 border-b">
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        user.roles[0] === "ROLE_ADMIN" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.roles[0] === "ROLE_ADMIN" ? "Admin" : "User"}
                      </span>
                    </td>
                  {/* <td className="p-4 border-b">{user.roles[0] === "ROLE_ADMIN" ? "Admin" : "User"}</td> */}
                  <td className="p-4 border-b flex justify-center space-x-4">
                    <button onClick={() => setEditUser(user)} className="text-yellow-500 hover:text-yellow-600 transition">
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-600 transition">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && <AddUserForm onClose={() => setShowAddForm(false)} />}
      {/* {showAddForm && true} */}
      {editUser && <EditUserForm user={editUser} onClose={() => setEditUser(null)} />}
      {/* {editUser && true} */}
    </div>
  );
};

export default UserManagement;
