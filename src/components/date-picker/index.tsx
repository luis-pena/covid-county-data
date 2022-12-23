import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/store";
import {
  selectEndDate,
  selectStartDate,
  setEndDate,
  setStartDate,
} from "slices/config";
import moment from "moment";
import { DATE_FORMAT } from "constants/index";

const DatePicker = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <MuiDatePicker
          minDate={moment("2020-01-05", DATE_FORMAT)}
          maxDate={moment(endDate, DATE_FORMAT)}
          disableFuture
          label="Start"
          value={startDate}
          onChange={(newStartDate) => {
            if (newStartDate) {
              dispatch(setStartDate(newStartDate.format(DATE_FORMAT)));
            }
          }}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
        <Typography sx={{ mx: ".5rem" }}>to</Typography>
        <MuiDatePicker
          label="End"
          value={moment(endDate, DATE_FORMAT)}
          minDate={moment(startDate, DATE_FORMAT)}
          disableFuture
          onChange={(newEndDate) => {
            if (newEndDate) {
              dispatch(setEndDate(newEndDate.format(DATE_FORMAT)));
            }
          }}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePicker;
