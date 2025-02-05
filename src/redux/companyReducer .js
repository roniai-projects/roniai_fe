import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCompanyDetails = createAsyncThunk(
  "company/getCompanyDetails",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${API_BASE_URL}/get_company_details`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });

      const companyData = response.data;

      dispatch(companySlice.actions.initializeCompany(companyData));

      return companyData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const listCompanies = createAsyncThunk(
//   "company/list_companies",
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const url = `${API_BASE_URL}/company`;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           accept: "application/json",
//         },
//       });

//       const companies = response.data;

//       dispatch(companySlice.actions.initializeCompany(companies));
//       return companies;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const updateCompanyInfo = createAsyncThunk(
  "company/updateCompanyInfo",
  async (data) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${API_BASE_URL}/update_company_info`;
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

export const logoutCompany = createAsyncThunk(
  "company/logoutCompany",
  async (_, { dispatch }) => {
    localStorage.removeItem("jwtToken");
    dispatch(companySlice.actions.resetCompany());
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState: {
    tech_startup: false,
  },
  reducers: {
    initializeCompany: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCompany: () => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyDetails.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(updateCompanyInfo.fulfilled, (state, action) => {
      return {
        ...state,
        company_address:
          action.payload.company_address || state.company_address,
        company_name: action.payload.company_name || state.company_name,
        industry: action.payload.industry || state.industry,
        tech_startup: action.payload.tech_startup || state.tech_startup,
        website: action.payload.website || state.website,
      };
    });
  },
});

export default companySlice.reducer;
