import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pricesService from "../services/prices.service";

export const fetchPrices = createAsyncThunk(
  "prices/fetchPrices",
 async () => {
   const res = await pricesService.fetchPrices();
   const prices = res.data.data;
   return prices;
 }
);

export const updatePrice = createAsyncThunk(
  "prices/updatePrice",
  async ({ priceValue, priceId }) => {
    const res = await pricesService.updatePrice({priceValue, priceId});
    if (res.status == 200) {
      return { priceValue, priceId };
    }
  }
)

const pricesSlice = createSlice({
  name: "prices",
  initialState: {
    prices: [],
    loading: false
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
    },
    [updatePrice.fulfilled]: (state, action) => {
      let foundIndex = state.prices.findIndex(
        price => price.priceId === action.payload.priceId
      );
      state.prices[foundIndex].priceValue = action.payload.priceValue;
    }
  }
});

export const { reducer } = pricesSlice;;

export default reducer;


