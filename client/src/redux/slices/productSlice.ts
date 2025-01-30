/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../../api/productApi";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  status: string;
  imgPath: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk("products/fetchAll", async () => {
  const data = await fetchAllProductsApi();
  return data;
});

export const createProduct = createAsyncThunk("products/create", async (productData: any) => {
  const data = await createProductApi(productData);
  return data;
});

export const updateProduct = createAsyncThunk("products/update", async ({ id, productData }: { id: number; productData: any }) => {
  const data = await updateProductApi(id, productData);
  return data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id: number) => {
  await deleteProductApi(id);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products.";
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
