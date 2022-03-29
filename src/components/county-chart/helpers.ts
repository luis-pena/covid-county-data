import { useTheme } from "@mui/material";

const tooltipDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

const tickDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
};

export const formatTooltipLabelDate = (date: string) => {
  const dateConstruct = new Date(date);
  return dateConstruct.toLocaleDateString(undefined, tooltipDateOptions);
};

export const colorMap = (index: number) => {
  const theme = useTheme();
  switch (index) {
    case 0:
      return theme.palette.secondary.light;
    case 1:
      return theme.palette.primary.light;
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

export const formatTickDate = (date: string) => {
  if (date) {
    const dateConstruct = new Date(date);
    const formattedDate = dateConstruct.toLocaleDateString(
      undefined,
      tickDateOptions
    );
    return formattedDate === "Invalid Date" ? "-" : formattedDate;
  }
  return "-";
};
