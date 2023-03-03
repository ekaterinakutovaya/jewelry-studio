import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditMode: false
};

const editModeSlice = createSlice({
  name: "editMode",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.isEditMode = action.payload;
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

export const { setEditMode } = editModeSlice.actions;

export default editModeSlice.reducer;
