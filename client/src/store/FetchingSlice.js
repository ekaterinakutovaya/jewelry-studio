import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetching: true
};

const fetchingSlice = createSlice({
  name: "fetching",
  initialState,
  reducers: {
    setFetching: (state, action) => {
      state.fetching = action.payload;
    }
  }
  // extraReducers: {
  //   [fetchOrders.pending]: (state, action) => {
  //     state.loading = true;
  //   },
  //   [fetchOrders.fulfilled]: (state, action) => {
  //     state.loading = false;
  //     state.orders = [...state.orders, ...action.payload];
  //   },
  //   [fetchOrders.rejected]: (state, action) => {
  //     state.loading = false;
  //   }
  // }
});

export const { setFetching } = fetchingSlice.actions;

export default fetchingSlice.reducer;
