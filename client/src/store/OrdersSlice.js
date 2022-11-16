import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersService from "../services/orders.service";
import { API_URL } from "../utils/consts";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (category) => {

    const response = await fetch(
      API_URL + `/fetch_orders.php?category=${+category}`
    );

    const res = await response.json();
    const orders = res.data;   
    
    return orders;
  }
);

export const search = createAsyncThunk(
  "orders/search",
  async (searchValue) => {
    // console.log(searchValue);
    
    const response = await ordersService.search(searchValue);
    const res = await response.json();
    // console.log(res);
    
    // const orders = res.data;        
    
    // return orders;
  }
);

export const fetchOrderByID = createAsyncThunk(
  "order/fetchOrderByID",
  async (id) => {
    const res = await ordersService.fetchOrderByID(id);
    // console.log(res.data.data);
    
    return res.data.data;
  }
)

export const quickOrderUpdate = createAsyncThunk(
  "orders/quickOrderUpdate",
  async ({ data } ) => {
    // console.log(data);
    
    const res = await ordersService.quickUpdate(data);
    // console.log(res);
    if (res.status == 200) {
      return data;
      
    }
    // return res.data;
  }
)

export const fraserStatusUpdate = createAsyncThunk(
         "orders/fraserStatusUpdate",
         async id => {

           const res = await ordersService.fraserStatusUpdate(id);
           console.log(res);
           if (res.status == 200) {
             return id;
           }
          //  return res.data;
         }
       );


const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: [],
    loading: false
  },
  reducers: {
    clearState: (state, action) => {
      state.orders = [];
    }
  },
  extraReducers: {
    [fetchOrders.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = [...state.orders, ...action.payload];
    },
    [fetchOrders.rejected]: (state, action) => {
      state.loading = false;
    },
    [fetchOrderByID.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOrderByID.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [fetchOrderByID.rejected]: (state, action) => {
      state.loading = false;
    },
    [quickOrderUpdate.fulfilled]: (state, action) => {
      let foundIndex = state.orders.findIndex(
        order => order.order_id == action.payload.order_id
      );
      // console.log(action.payload);

      state.orders[foundIndex].handover_date =
        action.payload.handover_date || null;
      state.orders[foundIndex].cat_index = action.payload.cat_index;
      state.orders[foundIndex].stat_index = action.payload.stat_index;
      state.orders[foundIndex].status_rate = action.payload.status_rate;
      state.orders[foundIndex].urgency = action.payload.urgency;
    },
    [fraserStatusUpdate.fulfilled]: (state, action) => {
      let foundIndex = state.orders.findIndex(
        order => order.order_id == action.payload
      );

      state.orders[foundIndex].stat_index = 1;
      state.orders[foundIndex].status_rate = 0;
      state.orders[foundIndex].status_name = "На резке";
    }
  }
});

export const { clearState } = ordersSlice.actions;

export default ordersSlice.reducer;
