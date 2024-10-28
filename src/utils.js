/**
 *
 * @param {number} month - A number that represent a year month (from 0 to 11)
 * @returns {string} - A string that represent the current calendar of the university
 */
const getCalendar = (month = new Date().getMonth()) => {
  const MONTH_AMOUNT = 12;
  if (month > MONTH_AMOUNT)
    throw new Error("Month should be less than " + MONTH_AMOUNT);

  const currentYear = new Date().getFullYear();
  const calendar =
    month + 1 >= MONTH_AMOUNT / 2 ? `${currentYear}B` : `${currentYear}A`;
  return calendar;
};

/**
 *
 * @param {import('express').Request} req
 * @param {string} endpoint - A string that represents an endpoint `"/test"`
 * @returns {string} - A string that represents the current server url
 */
const getServerUrl = (req, endpoint) => {
  return `${req.protocol}://${req.get("host")}${endpoint ?? ""}`;
};

module.exports = {
  getCalendar,
  getServerUrl,
};
