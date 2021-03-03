import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";

import { lineDataForCounty } from "lib/helpers";

type Props = {
  county: string;
  data: string;
};

const CasesByCounty: FunctionComponent<Props> = ({ county, data }) => {
  if (data === null) return null;

  return (
    <>
      <h1>New COVID-19 Cases By Day - {county} county</h1>
      <Line
        data={lineDataForCounty(data, county)}
        options={{
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "index",
            intersect: false,
          },
          chartArea: {
            backgroundColor: "palegreen",
          },
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
