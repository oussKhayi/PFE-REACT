import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      user_id: "",
      items: [],
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { user_email, product_id } = action.payload;
      const newItem = {
        product_id: product_id ? product_id : 33,
        quantity: 1,
      };
      if (user_email !== "") {
        axios
          .get(`http://localhost:3030/cart?user_id=${user_email}`)
          .then(async (response) => {
            const userCart = response.data
              ? response.data[0]
              : { user_id: user_email, items: [] };
            const cartId = response.data ? response.data[0].id : 0;

            userCart.items.push(newItem);
            try {
              axios
                .put(`http://localhost:3030/cart/${cartId}`, userCart)
                .then((req, response) => {});
            } catch (error) {
              console.error("Error updating cart:", error);
            }
          })
          .catch((error) => {
            console.error("Error fetching cart data:", error);
          });
      }
      state.user_id = action.payload.user_email;
      state.items.push(newItem);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItemFormCart: (state, action) => {
      const { user_email, product_id } = action.payload;
      state.user_id = action.payload.user_email;
      state.items.filter(
        (p) => parseInt(p.product_id) !== parseInt(action.payload.id)
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    emptyCart: (state, action) => {
      const { user_email } = action.payload;
      if (user_email !== "") {
        state.items = [];
        localStorage.setItem("cart", JSON.stringify(state));
        try {
          axios
            .get(`http://localhost:3030/cart/?user_id=${user_email}`)
            .then((response) => {
              const cartId = response.data[0].id;
              axios
                .put(`http://localhost:3030/cart/${cartId}`, {
                  user_id: user_email,
                  items: [],
                })
                .then((response) => {});
            });
        } catch (error) {
          console.error("Error empty cart:", error);
        }
      }
    },
  },
});

export const { addItem, emptyCart, removeItemFormCart } = cartSlice.actions;

export default cartSlice.reducer;
