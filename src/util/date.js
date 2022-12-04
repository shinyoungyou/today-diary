// Custom date format: e.g. 2022-01-01
export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // getMonth() returns from 0 -> need to add +1
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};
