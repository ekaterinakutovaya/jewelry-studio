import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/consts";

export const fetchRhinoFilesById = createAsyncThunk(
         "rhinoFiles/fetchRhinoFilesById",
         async id => {
           const response = await fetch(
             API_URL + `/fetch_rhino_files_by_id.php?order_id=${id}`
           );

           const files = await response.json();
          //  console.log(files.data);
           if (!files.data) {
             return [];
           }
           
           return files.data;
         }
       );

export const deleteRhinoFiles = rhinoFilesToDelete => {

} 



const rhinoFilesSlice = createSlice({
  name: "rhinoFiles",
  initialState: {
    rhinoFiles: [],
    loading: false
  },
  extraReducers: {
    [fetchRhinoFilesById.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchRhinoFilesById.fulfilled]: (state, action) => {
      state.loading = false;
      state.rhinoFiles = action.payload;
    },
    [fetchRhinoFilesById.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export const { reducer } = rhinoFilesSlice;

export default reducer;
