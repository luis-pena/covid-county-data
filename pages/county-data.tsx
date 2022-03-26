import React, { useEffect } from "react";

import Attribution from "components/attribution";
import CountyCharts from "components/county-charts";
import SingleColLayout from "components/layout/single-col";
import { Paper } from "@mui/material";
import {
  selectActiveCountyData,
  selectDates,
  selectHasFetchedCountyData,
  setCountyData,
} from "slices/county-data";

import { useAppDispatch, useAppSelector } from "hooks/store";
import { selectActiveCounties } from "slices/config";
import SelectedCounties from "components/selected-counties";

const CountyData = () => {
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
    <SingleColLayout title="COVID-19 U.S. County Cases and Deaths">
      <SelectedCounties />
      <Paper sx={{ px: 2, py: 8 }}>
        <CountyCharts
          activeCounties={activeCounties}
          dates={dates}
          countyData={countyData}
        />
        <Attribution />
      </Paper>
    </SingleColLayout>
  );
};

export default CountyData;
