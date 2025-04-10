import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const fetchMenuByRestaurantId = createAsyncThunk(
  'menu/fetchMenuByRestaurantId',
  async (restaurantId, { rejectWithValue }) => {
    try {
      console.log("Fetching menu for Restaurant ID:", restaurantId);
      const response = await axiosInstance.get(`${import.meta.env.VITE_APP_BASE_URL}/menuManagement`, {
        params: { id: restaurantId }
      });
      console.log("Menu Response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching menu:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response?.data || 'Failed to fetch menu');
    }
  }
);

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
  selectedRestaurantId: null
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurantId = action.payload;
      console.log("Selected Restaurant ID:", action.payload);
    },
    clearMenu: (state) => {
      state.categories = [];
      state.selectedRestaurantId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuByRestaurantId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuByRestaurantId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchMenuByRestaurantId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setSelectedRestaurant, clearMenu } = menuSlice.actions;

export default menuSlice.reducer;
