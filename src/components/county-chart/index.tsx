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
import { County, CountyTick } from "slices/county-data";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { colorMap, formatTickDate, formatTooltipLabelDate } from "./helpers";

type Props = {
  activeCounties: County[];
  countyData: {
    [county: string]: CountyTick[];
  } | null;
  dates: { date: string }[];
  dataKey: "newCases" | "newDeaths";
};

type DateObj = {
  date: string;
};

const CountyChart: FC<Props> = ({
  activeCounties,
  countyData,
  dataKey,
  dates,
}) => {
  const theme = useTheme();

  const getLineDataForCounty = (dateObj: DateObj, fips: string) => {
    if (countyData && countyData[fips]) {
      const index = countyData[fips].findIndex(
        (element: DateObj) => dateObj.date === element.date
      );
      if (countyData[fips][index] && countyData[fips][index][dataKey]) {
        return countyData[fips][index][dataKey];
      }
    }
    return null;
  };

  const renderTooltip: ContentType<ValueType, NameType> = ({ payload }) => {
    const { date } = (payload && payload[0]?.payload) || { date: null };
    if (date && countyData) {
      return (
        <Paper sx={{ px: 1.5, py: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {payload && formatTooltipLabelDate(date)}
          </Typography>
          {activeCounties.map((county, i) => {
            const index = countyData[county.fips]?.findIndex(
              (element: DateObj) => date === element.date
            );
            const datakey =
              (countyData[county.fips] &&
                countyData[county.fips][index] &&
                countyData[county.fips][index][dataKey]) ||
              0;
            return (
              <Typography
                key={county.fips}
                variant="subtitle1"
                color={colorMap(i)}
              >
                {`${county.county}: ${datakey?.toLocaleString()}`}
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
    return activeCounties[index].county;
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
        {activeCounties.map((county, index) => (
          <Line
            isAnimationActive={countyData !== null}
            key={county.fips}
            dot={false}
            type="monotone"
            dataKey={(data) => getLineDataForCounty(data, county.fips)}
            stroke={colorMap(index)}
            strokeWidth={2}
            activeDot={{ r: 5 }}
            connectNulls
          />
        ))}
        <Legend formatter={formatLegend} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CountyChart;
