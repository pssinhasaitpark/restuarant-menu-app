import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const fetchQRCode = createAsyncThunk(
  'qr/fetchQRCode',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_APP_BASE_URL}/menuManagement/qrCode`, {
        params: { id: restaurantId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch QR code');
    }
  }
);

const initialState = {
  qrCode: null,
  status: 'idle',
  error: null,
};

const QrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    clearQRCode: (state) => {
      state.qrCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQRCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQRCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.qrCode = action.payload;
        state.error = null;
      })
      .addCase(fetchQRCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearQRCode } = QrSlice.actions;
export default QrSlice.reducer;
