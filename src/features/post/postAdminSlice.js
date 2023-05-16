import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};
const url = "http://localhost:3030/admin";
export const postAdminSlice = createSlice({
  name: "postAdmin",
  initialState,
  reducers: {
    postAdmin: () => {
      axios
        .post(url, {
            "username": "admin02",
            "password": "password1",
            "email": "admin02@example.com"
          })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
export const { postAdmin } = postAdminSlice.actions;

export default postAdminSlice.reducer;
