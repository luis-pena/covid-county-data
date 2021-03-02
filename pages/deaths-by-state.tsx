import React, { useEffect, useState } from "react";

import LoadingIndicator from "components/loading-indicator";
import DeathsByState from "components/deaths-by-state";

const ByState = () => {
  const [stateDeathsByDay, setStateDeathsByDay] = useState("");
  const [
    hasFectchedStateDeathsByDay,
    setHasFectchedStateDeathsByDay,
  ] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (stateDeathsByDay) {
      setIsFetching(false);
    }
  }, [stateDeathsByDay]);

  // TODO make these custom hooks!
  useEffect(() => {
    setIsFetching(true);
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

  if (isFetching) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <div className="chart">
        <DeathsByState state="California" data={stateDeathsByDay} />
      </div>
      <p className="attribution">
        source:{" "}
        <a href="https://github.com/nytimes/covid-19-data" target="_blank">
          https://github.com/nytimes/covid-19-data
        </a>
      </p>
      <style jsx>{`
        .chart {
          padding-bottom: 5rem;
        }
        .attribution {
          text-align: center;
          color: rgba(54, 162, 235, 1);
          font-weight: bold;
          font-family: Arial;
          margin-bottom: 10rem;
        }
        .attribution a {
          color: rgba(153, 102, 255, 1);
        }
      `}</style>
    </>
  );
};

export default ByState;
