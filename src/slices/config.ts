import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "slices/store";

// Define a type for the slice state
interface ConfigState {
  counties: string[];
  usStates: string[];
}

// Define the initial state using that type
const initialState: ConfigState = {
  counties: ["Los Angeles, California", "San Diego, California"],
  usStates: ["California", "New York"],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setActiveCounties: (state, action: PayloadAction<string[]>) => {
      state.counties = action.payload;
    },
    setActiveUsStates: (state, action: PayloadAction<string[]>) => {
      state.usStates = action.payload;
    },
  },
});

// EXPORT ACTIONS
export const { setActiveCounties, setActiveUsStates } = configSlice.actions;

// SELECTORS
export const selectActiveCounties = (state: RootState) => state.config.counties;
export const selectActiveUsStates = (state: RootState) => state.config.usStates;

// REDUCER
export default configSlice.reducer;
