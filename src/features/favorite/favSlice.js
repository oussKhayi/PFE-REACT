import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3030";

const initialState = {
  user_id: "",
  favorite: [],
};

export const fetchFavorite = createAsyncThunk(
  "favorite/fetchFavorite",
  async (user_email) => {
    console.log(user_email);

    const response = await axios
      .get(`${API_URL}/favorite?user_id=${user_email}`)
      .then((res) => {
        if (res.data.length < 1) {
          axios
            .post(`${API_URL}/favorite`, { user_id: user_email, items: [] })
            .then((res) => {
              console.log("new fav inserted");
            });
        }
        return res;
      });
    return response.data;
  }
);

const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favItem: (state, action) => {
      const { user_email, product_id } = action.payload;
      const newP = product_id;
      if (user_email !== "") {
        axios
          .get(`http://localhost:3030/favorite?user_id=${user_email}`)
          .then(async (response) => {
            const userFav = response.data
              ? response.data[0]
              : { user_id: user_email, items: [] };
            const favId = response.data.length>0 ? response.data[0].id : 0;

            userFav.items.push(newP);
            try {
              axios
                .put(`http://localhost:3030/favorite/${favId}`, userFav)
                .then((req, response) => {
                  console.log("product id added to fav :", req.data);
                });
            } catch (error) {
              console.error("Error updating Fav:", error);
            }
          })
          .catch((error) => {
            console.error("Error fetching Fav data:", error);
          });
      }
      state.user_id = action.payload.user_email;
      state.favorite.push(newP);
      localStorage.setItem("favorite", JSON.stringify(state));
    },
    unfavorite: (state, action) => {
      const { user_email, product_id } = action.payload;
      const newP = product_id;
      if (user_email !== "") {
        axios
          .get(`http://localhost:3030/favorite?user_id=${user_email}`)
          .then(async (response) => {
            const userFav = response.data
              ? response.data[0]
              : { user_id: user_email, items: [] };
            console.log("newFaviIems before : ");
            console.log(userFav.items);
            const favId = response.data ? response.data[0].id : 0;
            const newFaviIems = userFav.items.filter((p) => parseInt(p.id) !== parseInt(newP));
            console.log("====================================");
            console.log("newFaviIems after: ");
            console.log(newFaviIems);
            console.log("====================================");
            try {
              axios
                .put(`http://localhost:3030/favorite/${favId}`, {
                  id: favId,
                  user_id: user_email,
                  items: newFaviIems,
                }) 
                .then((req, response) => {
                  console.log("Fav updated:", req.data);
                });
            } catch (error) {
              console.error("Error updating Fav:", error);
            }
          })
          .catch((error) => {
            console.error("Error fetching Fav data:", error);
          });
      }
      state.user_id = action.payload.user_email;
      state.favorite = state.favorite.filter((p) => p.id !== newP);
      localStorage.setItem("favorite", JSON.stringify(state));
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchFavorite.fulfilled, (state, action) => {
  //     state.favorite = action.payload[0]?.items || [];
  //     state.favoriteStatus = true;
  //     console.log("fetchFavorite success : ");
  //     console.log(state.favorite);
  //   });
  //   builder.addCase(fetchFavorite.fulfilled, (state, action) => {
  //     localStorage.setItem("allProducts", JSON.stringify(action.payload));
  //     state = { ...state, products: action.payload } || state;
  //     console.log("======new state with pr :=======");
  //     console.log(state);
  //     console.log("====================================");

  //     console.log(state.items);
  //   });
  // },
});

export const { favItem, unfavorite } = favSlice.actions;

export default favSlice.reducer;
