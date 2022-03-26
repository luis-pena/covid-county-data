import { useTheme } from "@mui/material";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatTooltipLabelDate = (date: string) => {
  const dateConstruct = new Date(date);
  return dateConstruct.toLocaleDateString(undefined, dateOptions);
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
    const formattedDate = dateConstruct.toLocaleDateString();
    return formattedDate === "Invalid Date" ? "-" : formattedDate;
  }
  return "-";
};
