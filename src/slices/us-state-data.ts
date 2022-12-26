import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "slices/store";
import { selectActiveUsStates } from "./config";

export type UsStateTick = {
  date: string;
  newCases: number | null;
  newDeaths: number | null;
};

// Define a type for the slice state
interface UsStateDataState {
  data: {
    [state: string]: UsStateTick[];
  } | null;
}

// Define the initial state using that type
const initialState: UsStateDataState = {
  data: null,
};

export const usStateDataSlice = createSlice({
  name: "usStateData",
  initialState,
  reducers: {
    setUsStateData: (
      state,
      action: PayloadAction<{ data: UsStateTick[]; state: string }[]>
    ) => {
      const usStateDictionary: { [state: string]: UsStateTick[] } = {};
      action.payload.forEach((usStateObj) => {
        usStateDictionary[usStateObj.state] = usStateObj.data;
      });
      state.data = usStateDictionary;
    },
  },
});

// EXPORT ACTIONS
export const { setUsStateData } = usStateDataSlice.actions;

// SELECTORS
const selectUsDataSlice = (state: RootState) => state.usStateData;

export const selectUsStateData = (state: RootState) =>
  selectUsDataSlice(state).data;

export const selectActiveUsStateData = createSelector(
  [selectActiveUsStates, selectUsStateData],
  (activeUsStates, data) => {
    if (data !== null) {
      const allData: { [usState: string]: UsStateTick[] } = {};
      activeUsStates.forEach((usState) => {
        allData[usState] = data[usState];
      });
      return allData;
    }
    return null;
  }
);

// REDUCER
export default usStateDataSlice.reducer;
