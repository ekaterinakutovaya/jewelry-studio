import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1
};

const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      // console.log(action);
      
      state.currentPage = action.payload;
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

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
