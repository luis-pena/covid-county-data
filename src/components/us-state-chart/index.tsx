import { CSSProperties, FC } from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Paper, Typography, useTheme } from "@mui/material";
import { ContentType } from "recharts/types/component/Tooltip";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { UsStateTick } from "slices/us-state-data";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { colorMap, formatTickDate, formatTooltipLabelDate } from "./helpers";

type Props = {
  activeUsStates: string[];
  usStateData: {
    [usState: string]: UsStateTick[];
  } | null;
  dates: { date: string }[];
  dataKey: "cases" | "deaths";
};

type DateObj = {
  date: string;
};

const UsStateChart: FC<Props> = ({
  activeUsStates,
  usStateData,
  dates,
  dataKey,
}) => {
  const theme = useTheme();

  const getLineDataForUsState = (dateObj: DateObj, usState: string) => {
    if (usStateData !== null) {
      const index = usStateData[usState].findIndex(
        (element: DateObj) => dateObj.date === element.date
      );
      return (
        usStateData[usState][index] && usStateData[usState][index][dataKey]
      );
    }
  };

  const renderTooltip: ContentType<ValueType, NameType> = ({ payload }) => {
    const { date } = (payload && payload[0]?.payload) || { date: null };
    if (date && usStateData !== null) {
      return (
        <Paper sx={{ px: 1.5, py: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {payload && formatTooltipLabelDate(date)}
          </Typography>
          {activeUsStates.map((usState, i) => {
            const index = usStateData[usState].findIndex(
              (element: DateObj) => date === element.date
            );
            const datakey =
              (usStateData[usState][index] &&
                usStateData[usState][index][dataKey]) ||
              "-";
            return (
              <Typography key={usState} variant="subtitle1" color={colorMap(i)}>
                {`${usState}: ${datakey?.toLocaleString()}`}
              </Typography>
            );
          })}
        </Paper>
      );
    } else {
      return <></>;
    }
  };

  const formatLegend: Formatter = (_value, _entry, index) => {
    return activeUsStates[index];
  };

  return (
    <ResponsiveContainer
      width="100%"
      minWidth={300}
      height="100%"
      minHeight={450}
    >
      <LineChart data={dates}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          minTickGap={24}
          dataKey="date"
          style={theme.typography.caption as CSSProperties}
          tickFormatter={formatTickDate}
        />
        <YAxis
          style={theme.typography.caption as CSSProperties}
          tickFormatter={(val) => val.toLocaleString()}
        />
        <Tooltip content={renderTooltip} />
        {activeUsStates.map((usState, index) => (
          <Line
            isAnimationActive={usStateData !== null}
            key={usState}
            dot={false}
            type="monotone"
            dataKey={(data) => getLineDataForUsState(data, usState)}
            stroke={colorMap(index)}
            activeDot={{ r: 5 }}
          />
        ))}
        <Legend formatter={formatLegend} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UsStateChart;
