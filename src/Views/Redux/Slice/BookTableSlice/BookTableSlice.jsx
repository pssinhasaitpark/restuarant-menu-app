import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchAvailableTables = createAsyncThunk(
  'tables/fetchAvailableTables',
  async (restaurantId, { rejectWithValue }) => {
    try {
      console.log("Fetching available tables for Restaurant ID:", restaurantId);
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/tables/availables`, {
        params: { id: restaurantId }
      });
      console.log("Available Tables Response:", response.data);
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching available tables:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response?.data || 'Failed to fetch available tables');
    }
  }
);

const BookTableSlice = createSlice({
  name: 'bookTable',
  initialState: {
    availableTables: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTables.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchAvailableTables.fulfilled, (state, action) => {
        state.availableTables = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvailableTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default BookTableSlice.reducer;
