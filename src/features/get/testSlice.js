import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3030";

export const checkUser = createAsyncThunk("get/checkUser", async (email) => {
  const response = await axios.get(`${API_URL}/users/${email}`);
  if (response.length > 0) {
    console.log("response : ", response.data);
  } else {
    console.log("doesn't exist");
  }
});

const initialState = {
  isLoading: false,
  selfError: null,
  isRejected: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { user_id: "", items: [] },
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    insertOne: async (state, action) => {
      const { email, displayName } = action.payload;
      await axios
        .post(`${API_URL}/users/`, {
          id: email,
          username: displayName,
          email: email,
          role: "user",
          status: "online",
        })
        .then((req, res) => {
          localStorage.setItem("user", JSON.stringify(req.data));
          state.user = req.data;
        });
    },
    insertOneCart: async (state, action) => {
      const { email } = action.payload;
      const isCartExist = await axios
        .get(`${API_URL}/cart/${email}`)
        .then((res) => {
          return res.data ? true : false;
        });
      if (!isCartExist) {
        await axios
          .post(`${API_URL}/cart`, {
            user_id: email,
            items: [],
          })
          .then((req, res) => {
            localStorage.setItem(
              "cart",
              JSON.stringify({
                user_id: email,
                items: [],
              })
            );
            state.cart = req.data;
            console.log("cart tt");
          });
      }
    },
    uploadCart: async (state, action) => {
      const { email, localCart } = action.payload;
      await axios
        .post(`${API_URL}/cart`, {
          user_id: email,
          items: localCart.items,
        })
        .then((req, res) => {
          console.table(JSON.parse(localStorage.getItem("cart")));
          state.cart = req.data;
          console.log("cart tt");
        });
    },
    testCheck: (state, action) => {
      const { email, displayName } = action.payload;
      axios.get(`${API_URL}/users/${email}`).then((res) => {});
    },
  },
});

export const { testCheck, insertOne, insertOneCart, uploadCart } =
  testSlice.actions;

export default testSlice.reducer;
