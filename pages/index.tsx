import React, { useEffect, useState } from "react";

import CasesByDay from "components/cases-by-day";
import LoadingIndicator from "components/loading-indicator";

const Home = () => {
  const [data, setData] = useState("");
  const [
    hasCountyDailyCasesBeenCalled,
    setHasCountyDailyCasesBeenCalled,
  ] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchCountyDailyCasesByDayCsv() {
      if (!hasCountyDailyCasesBeenCalled) {
        try {
          await fetch(
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
          )
            .then((response) => response.text())
            .then((data) => {
              setData(data);
            });
        } catch (e) {
          console.warn("ERROR", e);
        } finally {
          setHasCountyDailyCasesBeenCalled(true);
          setIsFetching(false);
        }
      }
    }
    fetchCountyDailyCasesByDayCsv();
  }, []);

  if (isFetching) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <CasesByDay county="Los Angeles" data={data} />
    </>
  );
};

export default Home;
