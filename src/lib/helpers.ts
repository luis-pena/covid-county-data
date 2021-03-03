// const bgColor = (cases: number) => {
//   if (cases < 500) {
//     return "rgba(75, 192, 192, 0.2)";
//   }
//   if (cases < 1000) {
//     return "rgba(54, 162, 235, 0.2)";
//   }
//   if (cases < 1500) {
//     return "rgba(153, 102, 255, 0.2)";
//   }
//   if (cases < 2000) {
//     return "rgba(255, 206, 86, 0.2)";
//   }
//   if (cases < 2500) {
//     return "rgba(255, 159, 64, 0.2)";
//   }
//   return "rgba(255, 99, 132, 0.2)";
// };

// const borderColor = (cases: number) => {
//   if (cases < 500) {
//     return "rgba(75, 192, 192, 1)";
//   }
//   if (cases < 1000) {
//     return "rgba(54, 162, 235, 1)";
//   }
//   if (cases < 1500) {
//     return "rgba(153, 102, 255, 1)";
//   }
//   if (cases < 2000) {
//     return "rgba(255, 206, 86, 1)";
//   }
//   if (cases < 2500) {
//     return "rgba(255, 159, 64, 1)";
//   }
//   return "rgba(255, 99, 132, 1)";
// };

// TODO refactor, we probably don't have to create a new instance for every county
export const lineDataForCounty = (data: string, county: string) => {
  const rows = data.split("\n");
  let lastTotalCases: number = 0;
  let d = {
    labels: [] as string[],
    datasets: [
      {
        label: `${county} County`,
        data: [] as number[],
        backgroundColor: "#fbdd74",
        borderColor: "#1f1235",
        pointBackgroundColor: "#ff6e6c",
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
      const newCases = Math.max(currentTotalCases - lastTotalCases, 0);
      if (currentDate > "2020-02-29") {
        d.labels.push(currentDate);
        d.datasets[0].data.push(newCases);
        // d.datasets[0].borderColor.push(borderColor(newCases));
        // d.datasets[0].backgroundColor.push("rgba(54, 162, 235, 0.2)");
      }
      lastTotalCases = currentTotalCases;
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
        data: [] as number[],
        backgroundColor: "#ff6e6c",
        borderColor: "#1f1235",
        pointBackgroundColor: "#67568c",
        borderWidth: 2,
        hoverRadius: 5,
      },
    ],
  };
  // const date = new Date();
  // const threeMonthsAgo = date.setMonth(date.getMonth() - 3);
  // const sixMonthsAgo = date.setMonth(date.getMonth() - 6);
  for (let i = 1; i <= rows.length - 1; i++) {
    const currentRow = rows[i].split(",");
    const currentDate = currentRow[0];
    // const currentDateParsed = Date.parse(currentDate);
    if (currentRow[1] === state) {
      const currentTotalDeaths = parseInt(currentRow[4]);
      const newDeaths = Math.max(currentTotalDeaths - lastTotalDeaths, 0);

      if (currentDate > "2020-02-29") {
        // add the date label
        d.labels.push(currentDate);

        d.datasets[0].data.push(newDeaths);
        // d.datasets[0].borderColor.push("rgba(255, 110, 108, 1)");
        // d.datasets[0].backgroundColor.push("rgba(255, 110, 108, .2)");
      }
      lastTotalDeaths = currentTotalDeaths;
    }
  }
  return d;
};
