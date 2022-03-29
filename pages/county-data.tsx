import { Paper, Typography, useTheme } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";

import CountyChart from "components/county-chart";
import CountyFilter from "components/county-filter";
import SingleColLayout from "components/layout/single-col";

import { selectActiveCounties } from "slices/config";
import {
  selectActiveCountyData,
  selectDates,
  selectHasFetchedCountyData,
  setCountyData,
} from "slices/county-data";

import { useAppDispatch, useAppSelector } from "hooks/store";

const CountyData = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const hasFetchedCountyData = useAppSelector(selectHasFetchedCountyData);
  const countyData = useAppSelector(selectActiveCountyData);
  const dates = useAppSelector(selectDates);
  const activeCounties = useAppSelector(selectActiveCounties);

  useEffect(() => {
    async function fetchCountyCasesByDay() {
      if (!hasFetchedCountyData) {
        try {
          await fetch(
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
          )
            .then((response) => response.text())
            .then((data) => {
              dispatch(setCountyData(data));
            });
        } catch (e) {
          console.log("ERROR", e);
        }
      }
    }
    fetchCountyCasesByDay();
  }, []);

  return (
    <SingleColLayout title="COVID-19 US County Cases and Deaths">
      <Head>
        <title>COVID-19 US County Cases and Deaths</title>
      </Head>
      <CountyFilter />
      <Paper sx={{ px: 2, py: 4, mb: 6 }}>
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
        <CountyChart
          activeCounties={activeCounties}
          dates={dates}
          countyData={countyData}
          dataKey="deaths"
        />
      </Paper>
    </SingleColLayout>
  );
};

export default CountyData;
