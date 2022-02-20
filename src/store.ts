import { configureStore } from "@reduxjs/toolkit";
import config from "slices/config";

export const store = configureStore({
  reducer: {
    config,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
