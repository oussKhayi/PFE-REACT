import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3030";

export const fetchProducts = createAsyncThunk("get/fetchProducts", async () => {
  const response = await axios.get(`${API_URL}/products/`).then((res) => {
    return res;
  });
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    isRejected: false,
    products: [],
    error: null,
  },
  reducers: {
    get: () => {
      fetchProducts();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRejected = false;

        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = action.error.message;
        console.log("failed", action.error.message);
      });
  },
});

export default productsSlice.reducer;
export const selectAllProducts = (state, payload) => {
  return state.product.products;
};
export const selectProductsByCategory = (state, category) =>
  state.product.products.filter((product) => product.category === category);

export const selectProductsById = (state, id) =>
  state.product.products.filter((product) => product.id === id);
export const { get } = productsSlice.actions;
