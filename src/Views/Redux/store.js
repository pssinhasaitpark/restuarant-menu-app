import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './Slice/menuSlice/menuSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

export default store;