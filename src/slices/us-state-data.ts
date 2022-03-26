import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "slices/store";
import { selectActiveUsStates } from "./config";

export type UsStateTick = {
  date: string;
  cases: number;
  totalCasesToDate: number;
  deaths: number;
  totalDeathsToDate: number;
};

// Define a type for the slice state
interface UsStateDataState {
  data: {
    [state: string]: UsStateTick[];
  } | null;
  dates: { date: string }[];
}

// Define the initial state using that type
const initialState: UsStateDataState = {
  data: null,
  dates: [],
};

export const usStateDataSlice = createSlice({
  name: "usStateData",
  initialState,
  reducers: {
    setUsStateData: (state, action: PayloadAction<string>) => {
      const data = action.payload;
      const rows = data.split("\n");

      const usStateDictionary: { [usState: string]: UsStateTick[] } = {};
      const datesDictionary: { [date: string]: boolean } = {};
      const dates = [];
      for (let i = 1; i <= rows.length - 1; i++) {
        const currentRow = rows[i].split(",");
        // 0: DATE     | "2022-03-12"
        // 1: US STATE | "Washington"
        // 2: FIPS     | "53"
        // 3: CASES    | "6732"
        // 4: DEATHS   | "11"

        const currentDate = currentRow[0];
        if (!datesDictionary[currentDate]) {
          dates.push({ date: currentDate });
          datesDictionary[currentDate] = true;
        }
        const currentUsState = currentRow[1];
        const currentTotalCases = parseInt(currentRow[3]);
        const currentTotalDeaths = parseInt(currentRow[4]);

        if (usStateDictionary[currentUsState]) {
          const usState = usStateDictionary[currentUsState];
          const newCasesForDay =
            currentTotalCases - usState[usState.length - 1].totalCasesToDate;
          const newDeaths =
            currentTotalDeaths - usState[usState.length - 1].totalDeathsToDate;

          usStateDictionary[currentUsState].push({
            date: currentDate,
            cases: Math.max(newCasesForDay, 0),
            totalCasesToDate: currentTotalCases,
            deaths: Math.max(newDeaths, 0),
            totalDeathsToDate: currentTotalDeaths,
          });
        } else {
          usStateDictionary[currentUsState] = [
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

export const selectDates = (state: RootState) => selectUsDataSlice(state).dates;

export const selectHasFetchedUsStateData = (state: RootState) =>
  selectUsStateData(state) !== null;

export const selectAllUsStates = createSelector([selectUsStateData], (data) => {
  if (data !== null)
    return Object.keys(data).map((usState) => ({
      title: usState,
    }));
  return [];
});

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
