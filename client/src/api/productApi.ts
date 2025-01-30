/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const fetchProductsApi = async () => {
  const response = await api.get("/products");
  return response.data.filter((product: any) => product.status === "PUBLISHED");
};

export const fetchProductByIdApi = async (productId: string) => {
  const response = await api.get(`/products/${productId}`);
  return response.data.data;
};

export const fetchAllProductsApi = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const createProductApi = async (productData: any) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const updateProductApi = async (productId: number, productData: any) => {
  const response = await api.put(`/products/${productId}`, productData);
  return response.data;
};

export const deleteProductApi = async (productId: number) => {
  await api.delete(`/products/${productId}`);
};
