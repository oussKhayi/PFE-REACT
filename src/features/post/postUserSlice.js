import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3030";

export const checkUserExists = createAsyncThunk(
  "users/checkUserExists",
  async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  }
);

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
});
const initialState = {
  user: null,
  isChecking: false,
  isAdding: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserExists.pending, (state) => {
        state.isChecking = true;
      })
      .addCase(checkUserExists.fulfilled, (state, action) => {
        state.isChecking = false;
        state.user = action.payload;
      })
      .addCase(checkUserExists.rejected, (state, action) => {
        state.isChecking = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isAdding = false;
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.error.message;
      });
  },
});

// export const selectUser = (state) => state.user.user;
export const selectUser = (state) => state?.postUser?.user || null;
export const selectIsChecking = (state) => state.user.isChecking;
export const selectIsAdding = (state) => state.user.isAdding;
export const selectError = (state) => state.user.error;

export const { clearUser, clearError } = userSlice.actions;

export default userSlice.reducer;
