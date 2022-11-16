import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/consts";

export const fetchCarats = createAsyncThunk("carats/fetchCarats", async () => {
  const response = await fetch(API_URL + `/fetch_carats.php`);

  const res = await response.json();
  return res.data;
});

const caratsSlice = createSlice({
  name: "carats",
  initialState: {
    carats: [],
    loading: false
  },
  extraReducers: {
    [fetchCarats.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCarats.fulfilled]: (state, action) => {
      state.loading = false;
      state.carats = action.payload;
    },
    [fetchCarats.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export const { reducer } = caratsSlice;

export default reducer;
