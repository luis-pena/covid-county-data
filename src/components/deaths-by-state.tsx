import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";

import { lineDataForState } from "lib/helpers";

type Props = {
  state: string;
  data: string;
};
const DeathsByState: FunctionComponent<Props> = ({ state, data }) => {
  if (data === null) return null;

  return (
    <>
      <h1>Daily COVID-19 Deaths - {state}</h1>
      <Line
        data={lineDataForState(data, state)}
        options={{
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "index",
            intersect: false,
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

export default DeathsByState;
