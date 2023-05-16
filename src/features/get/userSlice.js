// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../utils/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// const initialState = {
//   currentUser: null,
//   userLoading: false,
//   userError: null,
// };

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     getUserStart: (state) => {
//       state.userLoading = true;
//     },
//     getUserSuccess: (state, action) => {
//       state.userLoading = false;
//       state.currentUser = "action.payload";
//     },
//     getUserFailure: (state, action) => {
//       state.userLoading = false;
//       state.userError = "action.payload";
//     },
//   },
// });

// export const getUser = () => async (dispatch) => {
//   dispatch(getUserStart());
//   try {
//     const [user, loading] = useAuthState(auth);
//     // const user = await auth.signInWithPopup(provider);
//     const { email } = user;
//     console.log(email);
//     const response = await axios
//       .get(`http://localhost:3000/users?email=${email}`)
//       .then((response) => console.log(response.data));
//     if (response.data.length === 0) {
//       await axios.post(`http://localhost:3000/cart`, {
//         id: 1,
//         user_id: 3,
//         items: [],
//       });
//       dispatch(
//         getUserSuccess({
//           id: 1,
//           user_id: email,
//           items: [],
//         })
//       );
//     } else {
//       const { id } = response.data[0];
//       dispatch(getUserSuccess({ id, email, cart: [] }));
//     }
//   } catch (error) {
//     dispatch(getUserFailure(error));
//     console.log("not exist : ", error);
//   }
// };

// export const { getUserStart, getUserSuccess, getUserFailure } =
//   usersSlice.actions;

// export default usersSlice.reducer;
