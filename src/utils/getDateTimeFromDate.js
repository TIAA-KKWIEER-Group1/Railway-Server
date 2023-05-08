export const getDateTimeFromDate = (date, time) => {
  const [day, month, year] = date.split('/');
  const [hour, minute] = time.split(':');

  return new Date(year, month - 1, day, hour, minute);
};
