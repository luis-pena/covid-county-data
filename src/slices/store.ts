import { configureStore } from "@reduxjs/toolkit";
import config from "slices/config";
import countyData from "slices/county-data";

export const store = configureStore({
  reducer: {
    config,
    countyData,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
