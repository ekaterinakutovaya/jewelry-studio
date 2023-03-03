import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from '../utils/consts';
import ImagesService from "../services/images.service";

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async () => {
    const response = await fetch(API_URL + `/fetch_images.php`);

    const files = await response.json();
    if (!files.data) {
      return [];
    }

    return files.data;
  }
);

export const uploadImages = createAsyncThunk(
  "images/uploadImages",
  async ({image, orderId}) => {

    const res = await ImagesService.uploadImages(image, orderId);
    
    if (res.status == 200) {
      return res.data.image;
    }
  }
);

export const deleteImages = createAsyncThunk(
  "images/deleteImages",
  async (imagesToDelete) => {  

    imagesToDelete.map(image => {
      const res = ImagesService.deleteImages(image);
      if (res.status == 200) {
        return image.imageId;
      }
    })
  }
);

export const deleteSingleImage = createAsyncThunk(
  "images/deleteSingleImage",
  async (image) => {  
    // console.log(image);
    
      const res = await ImagesService.deleteSingleImage(image);
      if (res.status == 200) {        
        return image[0].imageId;
      }
  }
);



// export const fetchImagesById = createAsyncThunk(
//          "orderImages/fetchImagesById",
//          async id => {
//            const response = await fetch(
//              `http://juliyaserver/fetch_order_images.php?orderId=${id}`
//            );

//            const files = await response.json();
//            //  console.log(files.data);
//            if (!files.data) {
//              return [];
//            }

//            return files.data;
//          }
//        );

const ImagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    loading: false
  },
  extraReducers: {
    [fetchImages.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.images = action.payload;
    },
    [fetchImages.rejected]: (state, action) => {
      state.loading = false;
    },
    [uploadImages.pending]: (state, action) => {
      state.loading = true;
    },
    [uploadImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.images = [...state.images, action.payload];      
    },
    [uploadImages.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteSingleImage.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSingleImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.images = state.images.filter(image => image.imageId !== action.payload)     
    },
    [deleteSingleImage.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export const { reducer } = ImagesSlice;

export default reducer;
