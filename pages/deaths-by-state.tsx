import React, { useEffect, useState } from "react";

import Attribution from "components/attribution";
import DeathsByState from "components/deaths-by-state";
import NavigationMenu from "components/navigation-menu";
import SingleColLayout from "components/layout/single-col";

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
    <>
      <SingleColLayout>
        <NavigationMenu />
        <div className="chart">
          <DeathsByState state="California" data={stateDeathsByDay} />
        </div>
        <Attribution />
      </SingleColLayout>
      <style jsx>{`
        .chart {
          padding-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

export default ByState;
