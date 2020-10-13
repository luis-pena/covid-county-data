import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";

import { lineDataForStates } from "lib/helpers";

type Props = {
  state: string;
  data: string;
};
const DeathsByState: FunctionComponent<Props> = ({ state, data }) => {
  if (data === null) return null;

  return <Line data={lineDataForStates(data, state)} />;
};

export default DeathsByState;
