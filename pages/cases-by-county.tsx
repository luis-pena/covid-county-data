import React, { useEffect, useState } from "react";

import Attribution from "components/attribution";
import CasesByCounty from "components/cases-by-county";
import SingleColLayout from "components/layout/single-col";
import { Paper } from "@mui/material";

const Home = () => {
  const [countyCasesByDay, setCountyCasesByDay] = useState("");
  const [hasFectchedCountyCasesByDay, setHasFectchedCountyCasesByDay] =
    useState(false);

  useEffect(() => {
    if (countyCasesByDay) {
    }
  }, [countyCasesByDay]);

  // TODO make these custom hooks!
  useEffect(() => {
    async function fetchCountyCasesByDay() {
      if (!hasFectchedCountyCasesByDay) {
        try {
          await fetch(
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
          )
            .then((response) => response.text())
            .then((data) => {
              setCountyCasesByDay(data);
            });
        } catch (e) {
          console.log("ERROR", e);
        } finally {
          setHasFectchedCountyCasesByDay(true);
        }
      }
    }
    fetchCountyCasesByDay();
  }, []);

  return (
    <SingleColLayout title="COVID-19 Cases by County">
      <Paper sx={{ px: 2, py: 8 }}>
        <CasesByCounty county="Los Angeles" data={countyCasesByDay} />
        <Attribution />
      </Paper>
    </SingleColLayout>
  );
};

export default Home;
