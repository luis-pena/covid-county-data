import { CSSProperties, FC } from "react";

import { lineDataForState } from "lib/helpers";

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

type Props = {
  state: string;
  data: string;
};

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const DeathsByState: FC<Props> = ({ state, data }) => {
  const theme = useTheme();

  const formatTooltipLabelDate = (date: string) => {
    const dateConstruct = new Date(date);
    return dateConstruct.toLocaleDateString(undefined, dateOptions);
  };

  const formatTickDate = (date: string) => {
    const dateConstruct = new Date(date);
    return dateConstruct.toLocaleDateString();
  };

  const renderTooltip: ContentType<ValueType, NameType> = ({ payload }) => {
    return (
      <Paper sx={{ px: 1.5, py: 1 }}>
        <Typography variant="overline" color="text.secondary">
          {payload && formatTooltipLabelDate(payload[0]?.payload.date)}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          {payload && payload[0]?.payload.deaths.toLocaleString()}
        </Typography>
      </Paper>
    );
  };

  return (
    <ResponsiveContainer
      width="100%"
      minWidth={300}
      height="100%"
      minHeight={600}
    >
      <LineChart data={lineDataForState(data, state).datasets[0].data}>
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
        <Legend formatter={() => state} />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths"
          stroke={theme.palette.error.light}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DeathsByState;
