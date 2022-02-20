import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

// Define a type for the slice state
interface ConfigState {
  county: string;
}

// Define the initial state using that type
const initialState: ConfigState = {
  county: "Los Angeles",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setCounty: (state, action: PayloadAction<string>) => {
      state.county = action.payload;
    },
  },
});

// EXPORT ACTIONS
export const { setCounty } = configSlice.actions;

// SELECTORS
export const selectCounty = (state: RootState) => state.config.county;

// REDUCER
export default configSlice.reducer;
