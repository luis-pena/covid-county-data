import React, { useEffect, useState } from "react";

import Attribution from "components/attribution";
import DeathsByState from "components/deaths-by-state";
import SingleColLayout from "components/layout/single-col";
import { Paper } from "@mui/material";

const ByState = () => {
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
    <SingleColLayout title="COVID-19 Deaths by State">
      <Paper sx={{ px: 2, py: 8 }}>
        <DeathsByState state="California" data={stateDeathsByDay} />
        <Attribution />
      </Paper>
    </SingleColLayout>
  );
};

export default ByState;
