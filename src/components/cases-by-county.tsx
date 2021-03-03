import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";

import { lineDataForCounty } from "lib/helpers";

type Props = {
  county: string;
  data: string;
};

const CasesByCounty: FunctionComponent<Props> = ({ county, data }) => {
  if (data === null) {
    return <h1>{`Fetching for ${county} county`}</h1>;
  }

  return (
    <>
      <h1>New COVID-19 Cases By Day - {county} county</h1>
      <Line
        data={lineDataForCounty(data, county)}
        options={{
          ticks: {
            beginAtZero: true,
          },
          animationDuration: 10000,
        }}
      />
      <style jsx>{`
        h1 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default CasesByCounty;
