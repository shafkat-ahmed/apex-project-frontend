import moment from "moment";

export const formatDateToIso = (date) => {
  const d = new Date(date);
  return d.toISOString();
};

export const formatDateHMS = (date) => {
  return moment(date).format("YYYY-MM-DDTHH:mm:ss");
};

export const formatDateToIsoInput = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const getFromDate = (date) => {
  return moment(date).format("YYYY-MM-DDT00:00:00");
};

export const getToDate = (date) => {
  return moment(date).format("YYYY-MM-DDT23:59:59");
};

export const getExpiryDateColor = (expiryDate) => {
  const today = moment(new Date());
  const expiry = moment(expiryDate);
  const diff = expiry.diff(today, "days");

  if (diff < 0) {
    return "#ff0000"; // Expired
  } else if (diff <= 30) {
    return "#FFA500"; // Warning
  } else {
    return "#008000"; // Safe
  }
};

export const isExpired = (expiryDate) => {
  const today = moment(new Date());
  const expiry = moment(expiryDate);
  const diff = expiry.diff(today, "days");

  if (diff < 0) {
    return true; // Expired
  } else {
    return false; // Safe
  }
};

export const getAllMonthsOfYear = () => {
  const now = moment();
  const currentMonth = now.month();
  const year = now.year();

  const list = [];
  for (let m = 0; m < 12; m++) {
    const monthName = moment().month(m).format("MMMM");
    list.push({
      month: m + 1,
      year: year,
      name: `${monthName}, ${year}`,
    });
  }

  return list;
};

export const getRemainingMonthsOfYear = () => {
  const now = moment();
  const currentMonth = now.month();
  const year = now.year();

  const list = [];
  for (let m = currentMonth; m < 12; m++) {
    const monthName = moment().month(m).format("MMMM");
    list.push({
      month: m + 1,
      year: year,
      name: `${monthName}, ${year}`,
    });
  }

  return list;
};

export const getMonthNumber = (monthName) => {
  const month = moment().month(monthName).month(); // 0 based
  return month !== undefined ? month + 1 : null; // Convert to 1-based month number
};

export const getMonthName = (monthNumber) => {
  return moment()
    .month(monthNumber - 1)
    .format("MMMM"); // Convert to 0-based month index
};

export const getFiscalYears = (limit = 1) => {
  let year = moment().year() + 1;
  const list = [];
  // list.push({ label: `${year + 1}-${year}`, value: `${year + 1}-${year}` });

  for (let m = 0; m < limit; m++) {
    let label = `${year}-${year + 1}`;
    list.push({
      label,
      value: label,
    });
    year--;
  }
  return list;
};

export const getFiscalYearForDate = (inputDate) => {
  const m = inputDate ? moment(inputDate) : moment();
  if (!m.isValid()) return null;

  const month = m.month();
  let startYear = m.year();

  if (month < 6) {
    startYear = startYear - 1;
  }

  const endYear = startYear + 1;

  return `${startYear}-${endYear}`;
};

export const getAddedDaysDate = (date, days) => {
  console.log(
    "Date:",
    date,
    "Days to add:",
    days,
    moment(date).add(days, "days").toDate()
  );
  return moment(date).add(days, "days").format("YYYY-MM-DD");
};

export const getYearCount = (startDate, endDate = new Date()) => {
  const start = moment(startDate);
  const end = moment(endDate);
  return end.diff(start, "years");
};

export const getLocalDateString = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
