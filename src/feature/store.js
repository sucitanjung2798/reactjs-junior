import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./Api";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
});
