import React, { useEffect } from "react";

import UsStateChart from "components/us-state-chart";
import SingleColLayout from "components/layout/single-col";
import { Paper, Typography, useTheme } from "@mui/material";
import {
  selectActiveUsStateData,
  selectDates,
  selectHasFetchedUsStateData,
  setUsStateData,
} from "slices/us-state-data";
import UsStateFilter from "components/us-state-filter";
import { selectActiveUsStates } from "slices/config";
import { useAppDispatch, useAppSelector } from "hooks/store";

const USStateData = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const hasFetchedUsStateData = useAppSelector(selectHasFetchedUsStateData);
  const usStateData = useAppSelector(selectActiveUsStateData);
  const dates = useAppSelector(selectDates);
  const activeUsStates = useAppSelector(selectActiveUsStates);

  useEffect(() => {
    async function fetchStateDeathsByDay() {
      if (!hasFetchedUsStateData) {
        try {
          await fetch(
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
          )
            .then((response) => response.text())
            .then((data) => {
              dispatch(setUsStateData(data));
            });
        } catch (e) {
          console.log("ERROR", e);
        }
      }
    }
    fetchStateDeathsByDay();
  }, []);

  return (
    <SingleColLayout title="COVID-19 U.S. State Cases and Deaths">
      <UsStateFilter />
      <Paper sx={{ px: 2, py: 4, mb: 6 }}>
        <Typography
          variant="h5"
          sx={{ pb: 4, ml: 2 }}
          color={theme.palette.primary.dark}
        >
          New cases by day
        </Typography>
        <UsStateChart
          activeUsStates={activeUsStates}
          dates={dates}
          usStateData={usStateData}
          dataKey="cases"
        />
      </Paper>
      <Paper sx={{ px: 2, py: 8 }}>
        <Typography
          variant="h5"
          sx={{ pb: 4, ml: 2 }}
          color={theme.palette.primary.dark}
        >
          New deaths by day
        </Typography>
        <UsStateChart
          activeUsStates={activeUsStates}
          dates={dates}
          usStateData={usStateData}
          dataKey="deaths"
        />
      </Paper>
    </SingleColLayout>
  );
};

export default USStateData;
