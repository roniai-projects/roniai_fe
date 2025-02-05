import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${API_BASE_URL}/get_user_details`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });

      const userData = response.data;

      dispatch(userSlice.actions.initializeUser(userData));

      return userData;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePersonalInfo = createAsyncThunk(
  "user/updatePersonalInfo",
  async (data) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${API_BASE_URL}/update_personal_info`;
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

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    localStorage.removeItem("jwtToken");
    dispatch(userSlice.actions.resetUser());
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    initializeUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUser: () => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(updatePersonalInfo.fulfilled, (state, action) => {
      return {
        ...state,
        email: action.payload.email || state.email,
        first_name: action.payload.first_name || state.first_name,
        last_name: action.payload.last_name || state.last_name,
        password: action.payload.password || state.password,
        position: action.payload.position || state.position,
      };
    });
  },
});

export default userSlice.reducer;
