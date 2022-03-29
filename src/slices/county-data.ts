import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "slices/store";
import { selectActiveCounties } from "./config";

export type CountyTick = {
  date: string;
  cases: number;
  totalCasesToDate: number;
  deaths: number;
  totalDeathsToDate: number;
};

// Define a type for the slice state
interface CountyDataState {
  data: {
    [county: string]: CountyTick[];
  } | null;
  dates: { date: string }[];
}

// Define the initial state using that type
const initialState: CountyDataState = {
  data: null,
  dates: [],
};

export const countyDataSlice = createSlice({
  name: "countyData",
  initialState,
  reducers: {
    setCountyData: (state, action: PayloadAction<string>) => {
      const data = action.payload;
      const rows = data.split("\n");

      const countyDictionary: { [county: string]: CountyTick[] } = {};
      const datesDictionary: { [date: string]: boolean } = {};
      const dates = [];
      for (let i = 1; i <= rows.length - 1; i++) {
        const currentRow = rows[i].split(",");
        // 0: DATE     | "2022-03-12"
        // 1: COUNTY   | "Park"
        // 2: US STATE | "Wyoming"
        // 3: FIPS     | "56029"
        // 4: CASES    | "6732"
        // 5: DEATHS   | "136"

        const currentDate = currentRow[0];
        if (!datesDictionary[currentDate]) {
          dates.push({ date: currentDate });
          datesDictionary[currentDate] = true;
        }
        const currentCounty = currentRow[1];
        const currentUSState = currentRow[2];

        const formattedCounty = `${currentCounty}, ${currentUSState}`;
        const currentTotalCases = parseInt(currentRow[4]);
        const currentTotalDeaths = parseInt(currentRow[5]);
        if (countyDictionary[formattedCounty]) {
          const county = countyDictionary[formattedCounty];
          const newCasesForDay =
            currentTotalCases - county[county.length - 1].totalCasesToDate;
          const newDeaths =
            currentTotalDeaths - county[county.length - 1].totalDeathsToDate;

          countyDictionary[formattedCounty].push({
            date: currentDate,
            cases: Math.max(newCasesForDay, 0),
            totalCasesToDate: currentTotalCases,
            deaths: Math.max(newDeaths, 0),
            totalDeathsToDate: currentTotalDeaths,
          });
        } else {
          countyDictionary[formattedCounty] = [
            {
              date: currentDate,
              cases: currentTotalCases,
              totalCasesToDate: currentTotalCases,
              deaths: currentTotalDeaths,
              totalDeathsToDate: currentTotalDeaths,
            },
          ];
        }
      }
      state.dates = dates;
      state.data = countyDictionary;
    },
  },
});

// EXPORT ACTIONS
export const { setCountyData } = countyDataSlice.actions;

// SELECTORS
const selectCountyDataSlice = (state: RootState) => state.countyData;

export const selectCountyData = (state: RootState) =>
  selectCountyDataSlice(state).data;

export const selectDates = (state: RootState) =>
  selectCountyDataSlice(state).dates;

export const selectHasFetchedCountyData = (state: RootState) =>
  selectCountyData(state) !== null;

export const selectAllCounties = createSelector([selectCountyData], (data) => {
  if (data !== null)
    return Object.keys(data).map((county) => ({
      title: county,
    }));
  return [];
});

export const selectActiveCountyData = createSelector(
  [selectActiveCounties, selectCountyData],
  (activeCounties, data) => {
    if (data !== null) {
      const allData: { [county: string]: CountyTick[] } = {};
      activeCounties.forEach((county) => {
        allData[county] = data[county];
      });
      return allData;
    }
    return null;
  }
);

// REDUCER
export default countyDataSlice.reducer;
