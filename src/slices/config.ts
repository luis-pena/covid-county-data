import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

// Define a type for the slice state
interface ConfigState {
  counties: string[];
}

// Define the initial state using that type
const initialState: ConfigState = {
  counties: ["Los Angeles"],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setCounties: (state, action: PayloadAction<string[]>) => {
      state.counties = action.payload;
    },
  },
});

// EXPORT ACTIONS
export const { setCounties } = configSlice.actions;

// SELECTORS
export const selectCounties = (state: RootState) => state.config.counties;

// REDUCER
export default configSlice.reducer;
