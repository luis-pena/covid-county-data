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
import { CountyTick } from "slices/county-data";
import { Formatter } from "recharts/types/component/DefaultLegendContent";

type Props = {
  activeCounties: string[];
  countyData: {
    [county: string]: CountyTick[];
  } | null;
  dates: { date: string }[];
};

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

type DateObj = {
  date: string;
};

const CountyCharts: FC<Props> = ({ activeCounties, countyData, dates }) => {
  const theme = useTheme();

  const formatTooltipLabelDate = (date: string) => {
    const dateConstruct = new Date(date);
    return dateConstruct.toLocaleDateString(undefined, dateOptions);
  };

  const formatTickDate = (date: string) => {
    const dateConstruct = new Date(date);
    return dateConstruct.toLocaleDateString();
  };

  const getLineDataForCounty = (dateObj: DateObj, county: string) => {
    if (countyData !== null) {
      const index = countyData[county].findIndex(
        (element: DateObj) => dateObj.date === element.date
      );
      return countyData[county][index]?.cases;
    }
  };

  const colorMap = (index: number) => {
    switch (index) {
      case 0:
        return theme.palette.primary.light;
      case 1:
        return theme.palette.secondary.light;
      case 2:
        return theme.palette.warning.light;
      case 3:
        return theme.palette.success.light;
      case 4:
        return theme.palette.error.light;
      case 5:
        return theme.palette.info.light;

      default:
        return theme.palette.primary.light;
    }
  };

  const renderTooltip: ContentType<ValueType, NameType> = ({ payload }) => {
    const { date } = (payload && payload[0]?.payload) || { date: null };
    if (date && countyData !== null) {
      return (
        <Paper sx={{ px: 1.5, py: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {payload && formatTooltipLabelDate(date)}
          </Typography>
          {activeCounties.map((county, i) => {
            const index = countyData[county].findIndex(
              (element: DateObj) => date === element.date
            );
            const cases = countyData[county][index]?.cases;
            return (
              <Typography key={county} variant="subtitle1" color={colorMap(i)}>
                {`${county}: ${cases?.toLocaleString()}`}
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
    return activeCounties[index];
  };

  return (
    <ResponsiveContainer
      width="100%"
      minWidth={300}
      height="100%"
      minHeight={600}
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
            key={county}
            dot={false}
            type="monotone"
            dataKey={(data) => getLineDataForCounty(data, county)}
            stroke={colorMap(index)}
            activeDot={{ r: 5 }}
          />
        ))}
        <Legend formatter={formatLegend} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CountyCharts;
