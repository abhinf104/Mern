import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authInitialState } from "./initialStates";

const login = createAsyncThunk(
  "auth/login",
  async (sellerData, { rejectWithValue }) => {
    try {
      const data = await axios.get("/api/login", sellerData);
      return data;
    } catch (err) {
      rejectWithValue(err.response.data || "Failed to Authenticate");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token"); //removing token from localstorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token); // Store token in local storage
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export { login };
