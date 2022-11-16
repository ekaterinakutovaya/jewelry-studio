import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersService from "../services/orders.service";

export const fetchInserts = createAsyncThunk(
  "inserts/fetchInserts",
  async id => {
    const response = await fetch(
      `http://juliyaserver/fetch_order_inserts.php?${id !== null ? `order_id=${id}` : ""}`);

    const res = await response.json();    
    return res.data;
  }
);


const InsertsSlice = createSlice({
  name: "inserts",
  initialState: {
    inserts: [],
    loading: false
  },
  extraReducers: {
    [fetchInserts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchInserts.fulfilled]: (state, action) => {
      state.loading = false;
      state.inserts = action.payload;
    },
    [fetchInserts.rejected]: (state, action) => {
      state.loading = false;
    },
    // [quickOrderUpdate.fulfilled]: (state, action) => {
    //   let foundIndex = state.orders.findIndex(
    //     order => order.order_id == action.payload.order_id
    //   );
    //   console.log(action.payload);

    //   state.orders[foundIndex].handover_date =
    //     action.payload.handover_date || null;
    //   state.orders[foundIndex].cat_index = action.payload.cat_index;
    //   state.orders[foundIndex].stat_index = action.payload.stat_index;
    //   state.orders[foundIndex].order_status_rate =
    //     action.payload.order_status_rate;
    //   state.orders[foundIndex].order_urgency = action.payload.order_urgency;
    // }
  }
});

export const { reducer } = InsertsSlice;

export default reducer;
