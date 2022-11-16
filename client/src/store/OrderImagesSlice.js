import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from '../utils/consts';

export const fetchOrderImages = createAsyncThunk(
         "orderImages/fetchOrderImages",
         async () => {
           const response = await fetch(
             API_URL + `/fetch_order_images.php`
           );

           const files = await response.json();
            // console.log(files.data);
           if (!files.data) {
             return [];
           }

           return files.data;
         }
       );


// export const fetchOrderImagesById = createAsyncThunk(
//          "orderImages/fetchOrderImagesById",
//          async id => {
//            const response = await fetch(
//              `http://juliyaserver/fetch_order_images.php?order_id=${id}`
//            );

//            const files = await response.json();
//            //  console.log(files.data);
//            if (!files.data) {
//              return [];
//            }

//            return files.data;
//          }
//        );

const orderImagesSlice = createSlice({
  name: "orderImages",
  initialState: {
    orderImages: [],
    loading: false
  },
  extraReducers: {
    [fetchOrderImages.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOrderImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.orderImages = action.payload;
    },
    [fetchOrderImages.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export const { reducer } = orderImagesSlice;

export default reducer;
