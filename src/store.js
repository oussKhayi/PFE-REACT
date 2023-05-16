import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./features/counter/counterSlice";
// import productsReduce from "./features/product/productsSlice";
import postProductSlice from "./features/post/postProductSlice";
import postUserSlice from "./features/post/postUserSlice";
import postAdminSlice from "./features/post/postAdminSlice";
import productSlice from "./features/get/productSlice";
import cartSlice from "./features/cart/cartSlice";
// import userSlice from "./features/get/userSlice";
import testSlice from "./features/get/testSlice";
import favSlice from "./features/favorite/favSlice";
export const store = configureStore({
  reducer: {
    product: productSlice,
    // products: productsReduce,
    postProduct: postProductSlice,
    postUser: postUserSlice,
    postAdmin: postAdminSlice,
    cart: cartSlice,
    // users: userSlice,
    test: testSlice,
    favorite: favSlice,
  },
});
