import React, { useEffect, useState } from "react";

import Attribution from "components/attribution";
import LoadingIndicator from "components/loading-indicator";
import DeathsByState from "components/deaths-by-state";
import NavigationMenu from "components/navigation-menu";

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
      <NavigationMenu />
      <div className="chart">
        <DeathsByState state="California" data={stateDeathsByDay} />
      </div>
      <Attribution />
      <style jsx>{`
        .chart {
          padding-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

export default ByState;
