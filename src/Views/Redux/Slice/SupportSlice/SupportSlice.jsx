
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const postSupportData = createAsyncThunk(
  'support/postSupportData',
  async (data) => {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to post support data');
    }
    return await response.json();
  }
);

const supportSlice = createSlice({
  name: 'support',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSupportData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postSupportData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(postSupportData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default supportSlice.reducer;
