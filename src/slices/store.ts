import { configureStore } from "@reduxjs/toolkit";
import config from "slices/config";
import countyData from "slices/county-data";
import usStateData from "slices/us-state-data";

export const store = configureStore({
  reducer: {
    config,
    countyData,
    usStateData,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
