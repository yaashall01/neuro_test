/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const fetchUsersApi = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const fetchUserByIdApi = async (userId: number) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const createUserApi = async (userData: any) => {
  const response = await api.post("/users", userData)
  return response.data;
};

export const updateUserApi = async (userId: number, userData: any) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUserApi = async (userId: number) => {
  await api.delete(`/users/${userId}`);
};
