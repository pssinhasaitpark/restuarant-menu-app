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


export const bookTable = createAsyncThunk(
  'tables/bookTable',
  async ({ bookingData, restaurantId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/booking`, bookingData,{
        params: { id: restaurantId }
      });
      return response.data; 
    } catch (error) {
      console.error("Error posting booking:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response?.data || 'Failed to create booking');
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
      })
      .addCase(bookTable.pending, (state) => {
        state.loading = true;
        state.bookingError = null;
        state.bookingSuccess = false;
      })
      .addCase(bookTable.fulfilled, (state) => {
        state.loading = false;
        state.bookingSuccess = true; // Indicate booking was successful
      })
      .addCase(bookTable.rejected, (state, action) => {
        state.loading = false;
        state.bookingError = action.payload;
      });
  },
});
export default BookTableSlice.reducer;
