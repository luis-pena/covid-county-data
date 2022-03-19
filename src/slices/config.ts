import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "slices/store";

// Define a type for the slice state
interface ConfigState {
  counties: string[];
}

// Define the initial state using that type
const initialState: ConfigState = {
  counties: ["Los Angeles, California", "San Diego, California"],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setActiveCounties: (state, action: PayloadAction<string[]>) => {
      state.counties = action.payload;
    },
  },
});

// EXPORT ACTIONS
export const { setActiveCounties } = configSlice.actions;

// SELECTORS
export const selectActiveCounties = (state: RootState) => state.config.counties;

// REDUCER
export default configSlice.reducer;
