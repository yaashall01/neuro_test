/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, logoutUserApi, registerUserApi } from "../../api/authApi";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
  userId: number | null; 
  loading: boolean;
  error: string | null;
}

interface JwtPayload {
  roles: string[];
  id: number; 
}

const extractDataFromToken = (
  token: string | null
): { role: string | null; userId: number | null } => {
  if (!token) return { role: null, userId: null };
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return {
      role: decoded.roles.includes("ROLE_ADMIN") ? "admin" : "user",
      userId: decoded.id, 
    };
  } catch {
    return { role: null, userId: null };
  }
};

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  role: extractDataFromToken(localStorage.getItem("token")).role,
  userId: extractDataFromToken(localStorage.getItem("token")).userId, 
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      fullname,
      email,
      password,
    }: { fullname: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      await registerUserApi(fullname, email, password );
      return "Registration successful!";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await loginUserApi(email, password);
      localStorage.setItem("token", data.token);
      return data.token;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  logoutUserApi();
  localStorage.removeItem("token"); 
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        const { role, userId } = extractDataFromToken(action.payload);
        state.role = role;
        state.userId = userId; 
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.role = null;
        state.userId = null; 
      });
  },
});

export default authSlice.reducer;
