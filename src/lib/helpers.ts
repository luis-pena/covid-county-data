export const bgColor = (cases: number) => {
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

export const borderColor = (cases: number) => {
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
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        borderWidth: 1,
      },
    ],
  };
  for (let i = 1; i <= rows.length - 1; i++) {
    const currentRow = rows[i].split(",");
    if (currentRow[1] === county) {
      const currentTotalCases = parseInt(currentRow[4]);
      const newCases = currentTotalCases - lastTotalCases;
      d.labels.push(currentRow[0]);
      d.datasets[0].data.push(newCases);
      d.datasets[0].borderColor.push(borderColor(newCases));
      d.datasets[0].backgroundColor.push("rgba(54, 162, 235, 0.2)");
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
        label: `Deaths By Day in ${state}`,
        data: [] as number[],
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        borderWidth: 1,
      },
    ],
  };
  for (let i = 1; i <= rows.length - 1; i++) {
    const currentRow = rows[i].split(",");
    if (currentRow[1] === state) {
      const currentTotalDeaths = parseInt(currentRow[4]);

      const newDeaths = currentTotalDeaths - lastTotalDeaths;
      d.labels.push(currentRow[0]);

      d.datasets[0].data.push(newDeaths >= 0 ? newDeaths : 0);
      d.datasets[0].borderColor.push("rgba(255, 110, 108, 1)");
      d.datasets[0].backgroundColor.push("rgba(255, 110, 108, .2)");

      lastTotalDeaths = currentTotalDeaths;
    }
  }
  return d;
};
