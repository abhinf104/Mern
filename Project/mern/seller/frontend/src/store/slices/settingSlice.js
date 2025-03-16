import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { settingInitialState } from "./initialStates";

export const registerShop = createAsyncThunk(
  "setting/registration",
  async (storeData, { rejectWithValue }) => {
    try {
      await axios.post("api/register", storeData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editStoreInfo = createAsyncThunk(
  "setting/editStoreInfo",
  async (storeData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("api/editStoreInfo", storeData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState: settingInitialState,
  reducers: {
    // Define your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerShop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shop = action.payload;
        state.success = true;
      })
      .addCase(registerShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editStoreInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editStoreInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shop = action.payload;
        state.success = true;
      })
      .addCase(editStoreInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions } = settingSlice;

export default settingSlice.reducer;
