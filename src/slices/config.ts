import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DATE_FORMAT } from "constants/index";
import moment from "moment";
import type { RootState } from "slices/store";
import { County } from "./county-data";

// Define a type for the slice state
interface ConfigState {
  counties: County[];
  usStates: string[];
  startDate: string;
  endDate: string;
}

// Define the initial state using that type
const initialState: ConfigState = {
  counties: [{ fips: "06037", state: "CA", county: "Los Angeles County" }],
  usStates: ["California", "New York"],
  startDate: moment().subtract(60, "days").format(DATE_FORMAT),
  endDate: moment().format(DATE_FORMAT),
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setActiveCounties: (state, action: PayloadAction<County[]>) => {
      state.counties = action.payload;
    },
    setActiveUsStates: (state, action: PayloadAction<string[]>) => {
      state.usStates = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  },
});

// EXPORT ACTIONS
export const {
  setActiveCounties,
  setActiveUsStates,
  setStartDate,
  setEndDate,
} = configSlice.actions;

// SELECTORS
export const selectActiveCounties = (state: RootState) => state.config.counties;
export const selectActiveUsStates = (state: RootState) => state.config.usStates;
export const selectStartDate = (state: RootState) => state.config.startDate;
export const selectEndDate = (state: RootState) => state.config.endDate;

// REDUCER
export default configSlice.reducer;
