/**
 * Function that retrieve the current university calendar
 *
 * This calendar follows a specific format:
 *  - If the month is greater or equal than six (6), the calendar is "B" (Second year semester)
 *  - Otherwise, It will be considered as "A" (First year semester)
 *
 * @param {number} [month=new Date().getMonth()] - A number that represent a year month (from 0 to 11)
 * @returns {string} - A string that represent the current calendar of the university, e.g., "2024A" or "2024B".
 *
 * @throws {Error} If the provided month is greater than 11.
 */
const getCalendar = (month = new Date().getMonth()) => {
  const MONTH_AMOUNT = 12
  if (month > MONTH_AMOUNT) {
    throw new Error('Month should be less than ' + MONTH_AMOUNT)
  }

  const currentYear = new Date().getFullYear()
  const calendar =
    month + 1 >= MONTH_AMOUNT / 2 ? `${currentYear}B` : `${currentYear}A`
  return calendar
}

/**
 * Builds the full server URL using the protocol, host, and an optional endpoint.
 *
 * @param {import('express').Request} req The Express request object, which contains the protocol and host information.
 * @param {string} [endpoint=""] - A string that represents an endpoint `"/test"`
 * @returns {string} - A string that represents the current server url,  e.g., `"http://localhost:3000/test"`.
 */
const getServerUrl = (req, endpoint = '') => {
  return `${req.protocol}://${req.get('host')}${endpoint}`
}

module.exports = {
  getCalendar,
  getServerUrl
}
