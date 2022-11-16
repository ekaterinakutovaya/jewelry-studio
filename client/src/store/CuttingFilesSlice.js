import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/consts";

export const fetchCuttingFilesById = createAsyncThunk(
         "cuttingFiles/fetchCuttingFilesById",
         async id => {
           const response = await fetch(
             API_URL + `/fetch_cutting_file_by_id.php?order_id=${id}`
           );

           const files = await response.json();
          //  console.log(files.data);
           if (!files.data) {
             return [];
           }
           
           return files.data;
         }
       );

const cuttingFilesSlice = createSlice({
  name: "cuttingFiles",
  initialState: {
    cuttingFiles: [],
    loading: false
  },
  reducers: {
    removeCuttingFile: (state, action) => {
      console.log(action.payload);
      
    }
  },
  extraReducers: {
    [fetchCuttingFilesById.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCuttingFilesById.fulfilled]: (state, action) => {
      state.loading = false;
      state.cuttingFiles = action.payload;
    },
    [fetchCuttingFilesById.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export const { removeCuttingFile } = cuttingFilesSlice.actions;

export default cuttingFilesSlice.reducer;
