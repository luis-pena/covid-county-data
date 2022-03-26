import React, { useEffect, useState } from "react";

import Attribution from "components/attribution";
import USStateCharts from "components/us-state-charts";
import SingleColLayout from "components/layout/single-col";
import { Paper } from "@mui/material";

const USStateData = () => {
  const [stateDeathsByDay, setStateDeathsByDay] = useState("");
  const [hasFectchedStateDeathsByDay, setHasFectchedStateDeathsByDay] =
    useState(false);

  useEffect(() => {
    if (stateDeathsByDay) {
    }
  }, [stateDeathsByDay]);

  // TODO make these custom hooks!
  useEffect(() => {
    async function fetchStateDeathsByDay() {
      if (!hasFectchedStateDeathsByDay) {
        try {
          await fetch(
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
          )
            .then((response) => response.text())
            .then((data) => {
              setStateDeathsByDay(data);
            });
        } catch (e) {
          console.log("ERROR", e);
        } finally {
          setHasFectchedStateDeathsByDay(true);
        }
      }
    }
    fetchStateDeathsByDay();
  }, []);

  return (
    <SingleColLayout title="COVID-19 U.S. State Cases and Deaths">
      <Paper sx={{ px: 2, py: 8 }}>
        <USStateCharts state="California" data={stateDeathsByDay} />
        <Attribution />
      </Paper>
    </SingleColLayout>
  );
};

export default USStateData;
