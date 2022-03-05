export const lineDataForCounty = (data: string, county: string) => {
  const rows = data.split("\n");
  let lastTotalCases: number = 0;
  let lastTotalDeaths: number = 0;
  let d = {
    labels: [] as string[],
    datasets: [
      {
        label: `${county} County`,
        data: [] as { date: string; cases: number; deaths: number }[],
        backgroundColor: "#fbdd74",
        borderColor: "#1f1235",
        pointBackgroundColor: "#fbdd74",
        borderWidth: 2,
        hoverRadius: 5,
      },
    ],
  };
  for (let i = 1; i <= rows.length - 1; i++) {
    const currentRow = rows[i].split(",");
    const currentDate = currentRow[0];
    if (currentRow[1] === county) {
      const currentTotalCases = parseInt(currentRow[4]);
      const currentTotalDeaths = parseInt(currentRow[5]);
      const newCases = Math.max(currentTotalCases - lastTotalCases, 0);
      const newDeaths = Math.max(currentTotalDeaths - lastTotalDeaths, 0);
      if (currentDate > "2020-02-29") {
        d.datasets[0].data.push({
          date: currentDate,
          cases: newCases,
          deaths: newDeaths,
        });
      }
      lastTotalCases = currentTotalCases;
      lastTotalDeaths = currentTotalDeaths;
    }
  }
  return d;
};

export const lineDataForState = (data: string, state: string) => {
  const rows = data.split("\n");
  let lastTotalDeaths: number = 0;
  let d = {
    labels: [] as string[],
    datasets: [
      {
        label: state,
        data: [] as { date: string; deaths: number }[],
        backgroundColor: "#fbdd74",
        borderColor: "#1f1235",
        pointBackgroundColor: "#fbdd74",
        borderWidth: 2,
        hoverRadius: 5,
      },
    ],
  };
  for (let i = 1; i <= rows.length - 1; i++) {
    const currentRow = rows[i].split(",");
    const currentDate = currentRow[0];
    if (currentRow[1] === state) {
      const currentTotalDeaths = parseInt(currentRow[4]);
      const newDeaths = Math.max(currentTotalDeaths - lastTotalDeaths, 0);

      if (currentDate > "2020-02-29") {
        d.datasets[0].data.push({ date: currentDate, deaths: newDeaths });
      }
      lastTotalDeaths = currentTotalDeaths;
    }
  }
  return d;
};
