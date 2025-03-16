import { productInitialState } from "./initialStates";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("api/product/all", {
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

// Async thunk to add a product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put("api/product/add", product, {
        headers: {
          token: `${token}`,
        },
      });
      console.log("Successfully added products");
    } catch (err) {
      rejectWithValue(err.message || "Failed Adding a new product");
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: productInitialState,
  reducers: {
    // Define your reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
