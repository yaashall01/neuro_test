/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../../api/userApi";

interface User {
  id: number;
  fullname: string;
  email: string;
  roles: string[]; 
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const data = await fetchUsersApi();
  return data;
});

export const createUser = createAsyncThunk(
  "users/create",
  async (userData: any) => {
    const data = await createUserApi(userData);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ userId, userData }: { userId: number; userData: any }) => {
    const data = await updateUserApi(userId, userData);
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId: number, thunkAPI) => {
    const { auth } = thunkAPI.getState() as { auth: { userId: number } };

    if (auth.userId === userId) {
      return thunkAPI.rejectWithValue("You cannot delete yourself!");
    }

    await deleteUserApi(userId);
    return userId;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users.";
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
