/**
 * Assumes startDate is before endDate
 * @param startDate - date in string as 'YYYY-MM-DD'
 * @param endDate - date in string as 'YYYY-MM-DD'
 * @returns an array of dates represented in a string
 */
export const createDateRangeArray = (
  startDate: string,
  endDate: string
): { date: string }[] => {
  const dates = [];
  const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  for (let i = diffDays; i > 0; i--) {
    const runningDate = new Date(endDate);
    runningDate.setDate(runningDate.getDate() - i);
    dates.push({ date: runningDate.toISOString().substring(0, 10) });
  }
  return dates;
};
