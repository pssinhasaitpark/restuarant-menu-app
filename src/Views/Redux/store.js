import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './Slice/menuSlice/menuSlice'
import QrReducer from './Slice/QrSlice/QrSlice'
import BookTableReducer from './Slice/BookTableSlice/BookTableSlice'; 
import supportReducer from './Slice/SupportSlice/SupportSlice';
import menuCartReducer from './Slice/menuCartSlice/menuCartSlice'
export const store = configureStore({
  reducer: {
    menu: menuReducer,
    qr: QrReducer,
    tables:BookTableReducer,
    support:supportReducer,
    menuCart:menuCartReducer,
  },
});

export default store;