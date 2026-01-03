import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import rootReducer from './Server/rootSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    root: rootReducer
  },
});
