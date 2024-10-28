const { chromium } = require("playwright");
const config = require("./../config");
const { getCalendar } = require("./../utils");

/**
 *
 * @param {(page: import("playwright").Page, broser: import("playwright").Browser) => Promise<void>} callback
 */
async function scraper(callback) {
  const currentCalendarValue = getCalendar().replace(/A|a|B|b/, (match) =>
    match === "A" ? 10 : 20
  );
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(config.scrapeURl);

  const $calendarSelect = await page.$('select[name="ciclop"]');
  await $calendarSelect.selectOption({ value: currentCalendarValue });

  const $universityCenterSelect = await page.$('select[name="cup"]');
  await $universityCenterSelect.selectOption({
    value: config.universityCenterSelectValue,
  });

  const $consultButton = await page.$("#idConsultar");
  await $consultButton.click();

  await callback(page, browser);

  /*eslint-disable-next-line */
  process.exit(1);
}

module.exports = scraper;
