import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "@/utils/consts";
import filesService from "@/services/files.service.js";

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async ({ file, orderId }) => {
    const res = await filesService.uploadFile(file, orderId);
    if (res.status == 200) {
      return res.data.fileUploaded;
    }
  }
);

export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async () => {
    const res = await filesService.fetchFiles();

    if (res.status == 200) {
      // console.log(res);
      // return [];
      return res.data.data;
    }
  }
);


export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (file) => {
    const res = await filesService.deleteFile(file);
    if (res.status == 200) {
      return file.fileId;
    }
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    loading: false
  },
  reducers: {
    setFile: (state, action) => {
      state.files = [...state.files, action.payload];
      state.files = state.files.sort((a, b) => a.fileId - b.fileId);
    },
    removeFile: (state, action) => {
      state.files = state.files.filter(file => file.fileId !== action.payload);
    }
  },
  extraReducers: {
    [fetchFiles.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchFiles.fulfilled]: (state, action) => {
      state.loading = false;
      state.files = action.payload;
    },
    [fetchFiles.rejected]: (state, action) => {
      state.loading = false;
    },
    [uploadFile.pending]: (state, action) => {
      state.loading = true;
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    [uploadFile.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteFile.fulfilled]: (state, action) => {
      // state.cuttingFiles = state.cuttingFiles.filter(file => file.fileId !== action.payload) 
    },
  }
});

export const { setFile, removeFile } = filesSlice.actions;

export default filesSlice.reducer;
