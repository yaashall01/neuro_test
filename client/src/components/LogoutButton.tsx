import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store"; 
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()); 
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#e97e88] hover:bg-[#d96b76] text-white p-2 rounded-xl transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
