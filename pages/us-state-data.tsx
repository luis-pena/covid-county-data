import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Head from "next/head";

import SingleColLayout from "components/layout/single-col";
import UsStateChart from "components/us-state-chart";
import UsStateFilter from "components/us-state-filter";

import { useAppDispatch, useAppSelector } from "hooks/store";

import {
  selectActiveUsStates,
  selectEndDate,
  selectStartDate,
} from "slices/config";
import { selectActiveUsStateData, setUsStateData } from "slices/us-state-data";
import DatePicker from "components/date-picker";
import { createDateRangeArray } from "helpers";

const USStateData = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const usStateData = useAppSelector(selectActiveUsStateData);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const activeUsStates = useAppSelector(selectActiveUsStates);

  const dates = useMemo(
    () => createDateRangeArray(startDate, endDate),
    [startDate, endDate]
  );

  // FETCH STATE TIMESERIES DATA
  useEffect(() => {
    async function fetchStateData() {
      await fetch("api/us-state-data", {
        headers: { states: activeUsStates.toString() },
      }).then((res) =>
        res.json().then((data) => {
          dispatch(setUsStateData(data));
        })
      );
    }
    fetchStateData();
  }, [activeUsStates]);

  return (
    <SingleColLayout title="COVID-19 US State Cases and Deaths">
      <Head>
        <title>COVID-19 US State Cases and Deaths</title>
      </Head>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
        }}
      >
        <UsStateFilter />
        <DatePicker />
      </Stack>
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
          dataKey="newCases"
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
          dataKey="newDeaths"
        />
      </Paper>
    </SingleColLayout>
  );
};

export default USStateData;
