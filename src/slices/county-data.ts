import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "slices/store";

export type CountyTick = {
  date: string;
  newCases: number | null;
  newDeaths: number | null;
};

//TODO move this type to a shared space
export type County = {
  fips: string;
  county: string;
  state: string;
};

// Define a type for the slice state
interface CountyDataState {
  dataByFips: { [county: string]: CountyTick[] } | null;
  counties: County[];
}

// Define the initial state using that type
const initialState: CountyDataState = {
  dataByFips: null,
  counties: [],
};

export const countyDataSlice = createSlice({
  name: "countyData",
  initialState,
  reducers: {
    setCountyData: (
      state,
      action: PayloadAction<{ data: CountyTick[]; fips: string }[]>
    ) => {
      const dataDictionary: { [fips: string]: CountyTick[] } = {};
      action.payload.forEach((countyObj) => {
        dataDictionary[countyObj.fips] = countyObj.data;
      });
      state.dataByFips = dataDictionary;
    },
    setCounties: (state, action: PayloadAction<County[]>) => {
      const counties = action.payload;
      state.counties = counties;
    },
  },
});

// EXPORT ACTIONS
export const { setCountyData, setCounties } = countyDataSlice.actions;

// SELECTORS
const selectCountyDataSlice = (state: RootState) => state.countyData;

export const selectCountyData = (state: RootState) =>
  selectCountyDataSlice(state).dataByFips;

export const selectCounties = (state: RootState) =>
  selectCountyDataSlice(state).counties;

export const selectHasFetchedCountyData = (state: RootState) =>
  selectCountyData(state) !== null;

export const selectActiveCountyData = createSelector(
  [selectCountyData],
  (data) => {
    return data;
  }
);

// REDUCER
export default countyDataSlice.reducer;
