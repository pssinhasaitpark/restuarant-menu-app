// Redux/Slice/menuCartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMenuItems: [],
};

const menuCartSlice = createSlice({
  name: "menuCart",
  initialState,
  reducers: {
    addOrUpdateItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.selectedMenuItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        state.selectedMenuItems.push(item);
      }
    },
    removeItem: (state, action) => {
      state.selectedMenuItems = state.selectedMenuItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.selectedMenuItems.find((item) => item.id === itemId);
      if (item) {
        if (quantity <= 0) {
          state.selectedMenuItems = state.selectedMenuItems.filter(
            (i) => i.id !== itemId
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.selectedMenuItems = [];
    }
    
  },
});

export const {
  addOrUpdateItem,
  removeItem,
  updateItemQuantity,
  clearCart,
} = menuCartSlice.actions;

export default menuCartSlice.reducer;
