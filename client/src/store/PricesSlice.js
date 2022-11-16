import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from '../utils/consts';

export const fetchPrices = createAsyncThunk("prices/fetchPrices", async () => {
  const response = await fetch(API_URL + `/fetch_prices.php`);

         const res = await response.json();
        //  console.log(prices.data);
         const prices = res.data;
         

         return prices;
       });

const pricesSlice = createSlice({
  name: "prices",
  initialState: {
    prices: [],
    loading: false
  },
  reducers: {
    updatePrice: (state, action) => {
      let foundIndex = state.prices.findIndex(
        price => price.price_id == action.payload.id
      );
      state.prices[foundIndex].price_value = action.payload.value;
    }
  },
  extraReducers: {
    [fetchPrices.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPrices.fulfilled]: (state, action) => {
      state.loading = false;
      state.prices = action.payload;
    },
    [fetchPrices.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export const { updatePrice } = pricesSlice.actions;;

export default pricesSlice.reducer;
