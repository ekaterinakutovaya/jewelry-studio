import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import calculationService from "../services/calculation.service";
import axios from "axios";

export const fetchCalculations = createAsyncThunk(
  "calculation/fetchCalculations",
  async () => {
    const res = await calculationService.fetchCalculations();
    console.log(res);
    
    // if (res.data.data) {
    //   return res.data.data;
    // }
  }
);

export const fetchCalculationByID = createAsyncThunk(
  "calculation/fetchCalculationByID",
  async id => {
    const res = await calculationService.fetchCalculationByID(id);
    if (res.data.data) {
      return res.data.data;
    }
  }
);

// export const updateCalculation = createAsyncThunk(
//   "calculation/updateCalculation",
//   async ({ calculationData, orderId}) => {
//     console.log(calculationData);
    
//     // const res = await calculationService.updateCalculation(calc, orderId);
//     // console.log(res);
    
//     // if (res.data.data) {
//     //   return res.data.data;
//     // }
//   }
// );

const calculationSlice = createSlice({
  name: "calculation",
  initialState: {
    calculation: [
      {
        name: "",
        hallmark: "",
        unit: "",
        size: "",
        carat: "",
        qty: "",
        price: "",
        priceId: "",
        cost: "",
        isChecked: false
      }
    ],
    loading: false
  },
  reducers: {
    addData: (state, action) => {
      state.calculation.push(action.payload);
    },
    removeData: (state, action) => {
      state.calculation = state.calculation.filter(
        (_, i) => i !== action.payload
      );
    },
    clearCalculation: (state, action) => {
      state.calculation = [
        {
          name: "",
          hallmark: "",
          unit: "",
          size: "",
          carat: "",
          qty: "",
          price: "",
          priceId: "",
          cost: "",
          isChecked: false
        }
      ];
    },
    updateCalculation: (state, action) => {
      const { name, value, index } = action.payload;

      switch (name) {
        case "name":
          state.calculation[index].name = value;
          break;
        case "hallmark":
          state.calculation[index].hallmark = value;
          break;
        case "unit":
          state.calculation[index].unit = value;
          break;
        case "size":
          state.calculation[index].size = value;
          break;
        case "carat":
          state.calculation[index].carat = value;
          break;
        case "qty":
          state.calculation[index].qty = value;
          break;
        case "price":
          state.calculation[index].price = value;
          break;
        case "priceId":
          state.calculation[index].priceId = +value;
          break;
      }
    }
  },
  extraReducers: {
    [fetchCalculationByID.pending]: (state, action) => {
      state.calculation = [];
      state.loading = true;
    },
    [fetchCalculationByID.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.calculation = action.payload;
        return;
      }
      state.calculation = [
        {
          name: "",
          hallmark: "",
          unit: "",
          size: "",
          carat: "",
          qty: "",
          price: "",
          priceId: "",
          cost: "",
          isChecked: false
        }
      ];
    },
    [fetchCalculationByID.rejected]: (state, action) => {
      state.loading = false;
    },
  }
});

export const {
  clearCalculation,
  updateCalculation,
  addData,
  removeData
} = calculationSlice.actions;

export default calculationSlice.reducer;
