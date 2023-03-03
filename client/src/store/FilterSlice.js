import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersService from "../services/orders.service";


const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: 0,
    searchValue: ""
  },
  reducers: {
    changeSelectedTab: (state, action) => {
      state.category = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    }
  }

});

export const { changeSelectedTab, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
