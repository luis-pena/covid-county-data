import React, { useEffect, useState } from "react";

import Attribution from "components/attribution";
import LoadingIndicator from "components/loading-indicator";
import CasesByCounty from "components/cases-by-county";
import NavigationMenu from "components/navigation-menu";

const Home = () => {
  const [countyCasesByDay, setCountyCasesByDay] = useState("");
  const [
    hasFectchedCountyCasesByDay,
    setHasFectchedCountyCasesByDay,
  ] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (countyCasesByDay) {
      setIsFetching(false);
    }
  }, [countyCasesByDay]);

  // TODO make these custom hooks!
  useEffect(() => {
    setIsFetching(true);
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

  if (isFetching) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <NavigationMenu />
      <div className="chart">
        <CasesByCounty county="Los Angeles" data={countyCasesByDay} />
      </div>
      <p className="attribution">
        source:{" "}
        <a href="https://github.com/nytimes/covid-19-data" target="_blank">
          https://github.com/nytimes/covid-19-data
        </a>
      </p>
      <Attribution />
      <style jsx>{`
        .chart {
          padding-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

export default Home;
