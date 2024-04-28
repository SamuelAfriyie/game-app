const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDay = (date: string) => {
  const d = new Date(date).getDay();
  if (d < 10) return `0${d}`;
};
export const getMonth = (date: string) => {
  const m = new Date(date).getMonth();
  if (m < 10) return `0${m}`;
};

export const getMonthName = (date: string) => {
  return monthNames[new Date(date).getMonth()];
};
