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
  const d = new Date(date).getDate(); 
  if (d < 10) return `0${d}`;
  else return d;
};
export const getMonth = (date: string) => {
  const m = new Date(date).getMonth();
  if (m < 10) return `0${m}`;
  else return m;
};

export const getMonthName = (date: string) => {
  return monthNames[new Date(date).getMonth()];
};

export const generateUsername = (firstName: string): string => {
  const randomSuffix = Math.floor(Math.random() * 1000);
  const username = `${firstName
    .toLowerCase()
    .replace(/\s/g, "")}${randomSuffix}`;
  return username;
};
