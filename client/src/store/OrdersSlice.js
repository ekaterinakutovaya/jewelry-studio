import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersService from "../services/orders.service";
import { API_URL } from "../utils/consts";
import { toast } from "react-toastify";


export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ dataToAdd }) => {
    const res = await ordersService.createOrder({ dataToAdd });

    if (res.status == 200) {
      return res.data.orderId;
    }
  }
);

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
    console.log(searchValue);
    
    const response = await ordersService.search(searchValue);
    console.log(response);
    return response.data.data;
  }
);


export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ dataToAdd }) => {

    const res = await ordersService.updateOrder(dataToAdd);

    if (res.status == 200) {
      return dataToAdd;
    }
  }
)

export const quickOrderUpdate = createAsyncThunk(
  "orders/quickOrderUpdate",
  async ({ data }) => {

    const res = await ordersService.quickUpdate(data);
    if (res.status == 200) {
      return data;
    }
  }
)

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId) => {
    const res = await ordersService.deleteOrder(orderId);

    if (res.status == 200) {
        return orderId;      
    }

  }
)


export const orderStatusUpdate = createAsyncThunk(
  "orders/orderStatusUpdate",
  async id => {
    const res = await ordersService.orderStatusUpdate(id);
   
    if (res.status == 200) {
      return id;
    }
  }
);


const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    deleting: false
  },
  reducers: {
    clearState: (state, action) => {
      state.orders = [];
    }
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
    },
    [fetchOrders.pending]: (state, action) => {
      state.orders = [];
      state.loading = true;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [updateOrder.fulfilled]: (state, action) => {
      state.loading = false;
      let foundIndex = state.orders.findIndex(
        order => order.orderId === action.payload.orderId
      );
      state.orders[foundIndex] = action.payload;

    },
    [updateOrder.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteOrder.pending]: (state, action) => {
      state.deleting = true;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.deleting = false;
      state.orders = state.orders.filter(order => order.orderId !== action.payload);
    },
    [deleteOrder.rejected]: (state, action) => {
      state.deleting = false;
    },
    [quickOrderUpdate.pending]: (state, action) => {
      state.loading = true;
    },
    [quickOrderUpdate.fulfilled]: (state, action) => {
      state.loading = false;
      let foundIndex = state.orders.findIndex(
        order => order.orderId == action.payload.orderId
      );
      // If category was changed remove order
      if (+state.orders[foundIndex].catIndex !== action.payload.catIndex) {
        state.orders = state.orders.filter(order => order.orderId !== action.payload.orderId);
        toast.success(`Запись перемещена во вкладку "${action.payload.categoryName}"!`, {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      state.orders[foundIndex].handoverDate = action.payload.handoverDate || null;
      state.orders[foundIndex].catIndex = action.payload.catIndex;
      state.orders[foundIndex].statIndex = action.payload.statIndex;
      state.orders[foundIndex].statusRate = action.payload.statusRate;
      state.orders[foundIndex].urgencyIndex = action.payload.urgencyIndex;
    },

    [orderStatusUpdate.fulfilled]: (state, action) => {
      let foundIndex = state.orders.findIndex(
        order => order.orderId == action.payload
      );

      state.orders[foundIndex].statIndex = 1;
      state.orders[foundIndex].statusRate = 0;
      state.orders[foundIndex].statusName = "На резке";
    },
    [search.fulfilled]: (state, action) => {
      console.log(action.payload);
    }
  }
});

export const { clearState } = ordersSlice.actions;

export default ordersSlice.reducer;
