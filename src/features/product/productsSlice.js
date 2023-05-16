import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://loscalhost:3030/db";
export const getState = createAsyncThunk(
  "product/productsSlice.js",
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState = {
  status: { isLoading: false, isRejected: false },
  admin: [],
  users: [],
  cart: [],
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getState.pending, (state) => {
        state.status.isLoading = true;
        console.log("loading...");
      })
      .addCase(getState.fulfilled, (state, action) => {
        // console.log(action);
        console.log("Done !");
        return action.payload;
      })
      .addCase(getState.rejected, (state, action) => {
        console.log(action);
        state.status.isLoading = true;
        state.status.isRejected = true;
        console.log("!!!! rejected !!!!");
      });
  },
});
export const { changeAdminPassword } = productsSlice.actions;

export default productsSlice.reducer;
