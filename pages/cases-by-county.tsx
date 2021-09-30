import React, { useEffect, useState } from "react";

import Attribution from "components/attribution";
import CasesByCounty from "components/cases-by-county";
import NavigationMenu from "components/navigation-menu";
import SingleColLayout from "components/layout/single-col";

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
    <SingleColLayout>
      <NavigationMenu />
      <div className="chart">
        <CasesByCounty county="Los Angeles" data={countyCasesByDay} />
      </div>
      <Attribution />
      <style jsx>{`
        .chart {
          padding-bottom: 5rem;
        }
      `}</style>
    </SingleColLayout>
  );
};

export default Home;
