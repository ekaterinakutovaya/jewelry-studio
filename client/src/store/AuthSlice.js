import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

export const regUser = createAsyncThunk(
  "auth/register",
  async ({ username, password }, thunkAPI) => {
    // console.log(username, password);
    try {
      const response = await authService.register(username, password);
      // console.log(response);
    } catch (error) {}
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authService.login(username, password);
      // console.log(data);

      if (response.status === 200) {
        // console.log("200");
        // console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      // console.log(error);

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isError = false;

      return state;
    },
  },
  extraReducers: {
    [regUser.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [regUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isError = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;