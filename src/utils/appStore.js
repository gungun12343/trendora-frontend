import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import featuredReducer from './featuredSlice';

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    featured: featuredReducer
  },
})

export default appStore;