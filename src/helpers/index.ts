import { DATE_FORMAT } from "constants/index";
import moment from "moment";

/**
 * startDate should be in the past relative to endDate
 * @param startDate - date in string as 'YYYY-MM-DD'
 * @param endDate - date in string as 'YYYY-MM-DD'
 * @returns an array of dates represented in a string
 */
export const createDateRangeArray = (
  startDate: string,
  endDate: string
): { date: string }[] => {
  const dates = [];
  const diffDays = Math.abs(
    moment(startDate, DATE_FORMAT).diff(moment(endDate, DATE_FORMAT), "days")
  );

  for (let i = diffDays; i > 0; i--) {
    const runningDate = new Date(endDate);
    runningDate.setDate(runningDate.getDate() - i);
    dates.push({ date: runningDate.toISOString().substring(0, 10) });
  }
  return dates;
};
