import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const regUser = createAsyncThunk(
  "auth/regUser",
  async ({ username, password }, thunkAPI) => {

    try {
      const response = await authService.register(username, password);
      return response.data.message;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authService.login(username, password);

      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user, loading: false }
  : { isLoggedIn: false, user: null, loading: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [regUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
    },
    [regUser.pending]: (state, action) => {
      state.loading = true;
    },
    [regUser.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
      state.isLoggedIn = false;
      state.user = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

export const { reducer } = authSlice;

export default reducer;