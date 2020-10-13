import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";

import { lineDataForCounty } from "lib/helpers";

type Props = {
  county: string;
  data: string;
};

const CasesByDay: FunctionComponent<Props> = ({ county, data }) => {
  if (data === null) {
    return <h1>{`Fetching for ${county} county`}</h1>;
  }
  return <Line data={lineDataForCounty(data, county)} />;
};

export default CasesByDay;
