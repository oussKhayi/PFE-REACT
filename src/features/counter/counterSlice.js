import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  count: 10,
  isLoading: false,
  isDbError: false,
};

const url = "http://localhost:3030/my-data";
export const getCounterState = createAsyncThunk(
  "counter/counterSlice.js",
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(url);

      return resp.data.counter;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
// export const setCounterState = createAsyncThunk(
//   "counter/counterSlice.js",
//   async (name, thunkAPI) => {
//     try {
//       const resp = await axios.get(url);

//       return resp.data.counter;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("something went wrong");
//     }
//   }
// );

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrCounter: (state) => {
      state.count += 1;
    },
    decrCounter: (state) => {
      state.count -= 1;
    },
    emptyCounter: (state) => {
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCounterState.pending, (state) => {
        state.isLoading = true;
        console.log("loading...");
      })
      .addCase(getCounterState.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.count = action.payload;
        console.log("Done !");
      })
      .addCase(getCounterState.rejected, (state, action) => {
        console.log(action);
        state.isLoading = true;
        state.isDbError = true;
        console.log("!!!! rejected !!!!");
      });
  },
});

export const { incrCounter, decrCounter, emptyCounter } = counterSlice.actions;
export default counterSlice.reducer;
