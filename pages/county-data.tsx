import {
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";

import CountyChart from "components/county-chart";
import CountyFilter from "components/county-filter";
import SingleColLayout from "components/layout/single-col";

import {
  selectActiveCounties,
  selectEndDate,
  selectStartDate,
} from "slices/config";
import {
  selectActiveCountyData,
  setCounties,
  setCountyData,
} from "slices/county-data";

import { useAppDispatch, useAppSelector } from "hooks/store";
import DatePicker from "components/date-picker";
import { createDateRangeArray } from "helpers";

const CountyData = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const countyData = useAppSelector(selectActiveCountyData);
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);
  const activeCounties = useAppSelector(selectActiveCounties);
  const [hasFetchedCounties, setHasFecthedCounties] = useState(false);

  useEffect(() => {
    async function fetchCountyCasesByDay() {
      if (!hasFetchedCounties) {
        try {
          await fetch("api/counties").then((res) =>
            res.json().then((data) => {
              dispatch(setCounties(data));
            })
          );
          setHasFecthedCounties(true);
        } catch (e) {
          console.log("ERROR", e);
        }
      }
    }
    fetchCountyCasesByDay();
  }, []);

  useEffect(() => {
    async function fetchCountyDataByFips() {
      const fipsArr = activeCounties.map((county) => county.fips);
      await fetch("api/county-data", {
        headers: { fips: fipsArr.toString() },
      }).then((res) =>
        res.json().then((data) => {
          dispatch(setCountyData(data));
        })
      );
    }
    fetchCountyDataByFips();
  }, [activeCounties]);

  const dates = useMemo(
    () => createDateRangeArray(startDate, endDate),
    [startDate, endDate]
  );

  return (
    <SingleColLayout title="COVID-19 US County Cases and Deaths">
      <Head>
        <title>COVID-19 US County Cases and Deaths</title>
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
        <CountyFilter />
        <DatePicker />
      </Stack>
      <Paper sx={{ px: 2, py: 4, mb: 6, position: "relative" }}>
        <Typography
          variant="h5"
          sx={{ pb: 4, ml: 2 }}
          color={theme.palette.primary.dark}
        >
          New cases by day
        </Typography>
        <CountyChart
          activeCounties={activeCounties}
          dates={dates}
          countyData={countyData}
          dataKey="newCases"
        />
        {!countyData && (
          <LinearProgress
            sx={{
              position: "absolute",
              top: 0,
              zIndex: "100000",
              width: "100%",
              left: 0,
              borderRadius: "12px 12px 0 0",
            }}
          />
        )}
      </Paper>
      <Paper sx={{ px: 2, py: 8 }}>
        <Typography
          variant="h5"
          sx={{ pb: 4, ml: 2 }}
          color={theme.palette.primary.dark}
        >
          New deaths by day
        </Typography>
        <CountyChart
          activeCounties={activeCounties}
          dates={dates}
          countyData={countyData}
          dataKey="newDeaths"
        />
      </Paper>
    </SingleColLayout>
  );
};

export default CountyData;
