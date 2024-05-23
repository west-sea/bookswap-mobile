import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "./auth";

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
