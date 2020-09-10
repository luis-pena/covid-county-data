import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Home = () => {
  const [data, setData] = useState({});
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const borderColor = (cases: number) => {
    if (cases < 500) {
      return "rgba(75, 192, 192, 1)";
    }
    if (cases < 1000) {
      return "rgba(54, 162, 235, 1)";
    }
    if (cases < 1500) {
      return "rgba(153, 102, 255, 1)";
    }
    if (cases < 2000) {
      return "rgba(255, 206, 86, 1)";
    }
    if (cases < 2500) {
      return "rgba(255, 159, 64, 1)";
    }
    return "rgba(255, 99, 132, 1)";
  };

  const backgroundColor = (cases: number) => {
    if (cases < 500) {
      return "rgba(75, 192, 192, 0.2)";
    }
    if (cases < 1000) {
      return "rgba(54, 162, 235, 0.2)";
    }
    if (cases < 1500) {
      return "rgba(153, 102, 255, 0.2)";
    }
    if (cases < 2000) {
      return "rgba(255, 206, 86, 0.2)";
    }
    if (cases < 2500) {
      return "rgba(255, 159, 64, 0.2)";
    }
    return "rgba(255, 99, 132, 0.2)";
  };

  useEffect(() => {
    setIsFetching(true);
    async function fetchCsv() {
      if (!hasBeenCalled) {
        try {
          await fetch(
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
          )
            .then((response) => response.text())
            .then((data) => {
              console.log("FETCHED");
              const rows = data.split("\n");
              const headers = rows[0];
              console.log(headers);

              let lastTotalCases: number = 0;
              let d = {
                labels: [] as string[],
                datasets: [
                  {
                    label: "New Covid Cases By Day",
                    data: [] as number[],
                    backgroundColor: [] as string[],
                    borderColor: [] as string[],
                    borderWidth: 1,
                  },
                ],
              };
              for (let i = 1; i <= rows.length - 1; i++) {
                const currentRow = rows[i].split(",");
                if (currentRow[1] === "Los Angeles") {
                  const currentTotalCases = parseInt(currentRow[4]);
                  const newCases = currentTotalCases - lastTotalCases;
                  console.log(
                    `${currentRow[0]} /total: ${currentTotalCases} / new: ${newCases}`
                  );
                  d.labels.push(currentRow[0]);
                  d.datasets[0].data.push(newCases);
                  d.datasets[0].borderColor.push(borderColor(newCases));
                  d.datasets[0].backgroundColor.push(backgroundColor(newCases));
                  lastTotalCases = currentTotalCases;
                }
              }
              console.log("DONE with for loop");

              setData(d);
            });
        } catch (e) {
          console.log("ERROR", e);
        } finally {
          setHasBeenCalled(true);
          setIsFetching(false);
        }
      }
    }
    fetchCsv();
  }, []);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }
  return <Line data={data} />;
};

export default Home;
