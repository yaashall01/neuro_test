import api from "./api";

export const registerUserApi = async (
  fullname: string,
  email: string,
  password: string
) => {
  const response = await api.post("/register", { fullname, email, password });
  return response.data; 
};

export const loginUserApi = async (username: string, password: string) => {
  const response = await api.post("/login_check", { username, password });
  return response.data; 
};

export const logoutUserApi = () => {
  localStorage.removeItem("token");
};
