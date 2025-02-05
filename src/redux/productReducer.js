import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${API_BASE_URL}/get_product_details`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });

      const productData = response.data;

      dispatch(productSlice.actions.initializeProduct(productData));

      return productData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductInfo = createAsyncThunk(
  "product/updateCompanyInfo",
  async (data) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${API_BASE_URL}/update_product_info`;
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const logoutProduct = createAsyncThunk(
  "product/logoutProduct",
  async (_, { dispatch }) => {
    localStorage.removeItem("jwtToken");
    dispatch(productSlice.actions.resetProduct());
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    tech_startup: false,
  },
  reducers: {
    initializeProduct: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetProduct: () => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(updateProductInfo.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload.products || state.products,
        services: action.payload.services || state.services,
        total_no_products:
          action.payload.total_no_products || state.total_no_products,
      };
    });
  },
});

export default productSlice.reducer;
