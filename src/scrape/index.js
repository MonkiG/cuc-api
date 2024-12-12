/* global process */
const { getClient } = require('../db-pgsql')
const professorsScraper = require('./professors')
const subjectScrapper = require('./subject')

const scrapers = {
  prof: professorsScraper,
  sub: subjectScrapper
}

const arg = process.argv.slice(-1)[0]

if (!(arg in scrapers) && arg !== 'all') {
  console.error('No scraper found')
  process.exit(1)
}

const client = getClient();

(async () => {
  try {
    console.log('Initializing scrapping')
    await client.connect()

    if (arg === 'all') {
      for (const [key, scraper] of Object.entries(scrapers)) {
        console.log(`Running scraper: ${key}`)
        await scraper(client)
        console.log(`Completed scraper: ${key}`)
      }
    } else {
      console.log(`Running scraper: ${arg}`)
      await scrapers[arg](client)
      console.log(`Completed scraper: ${arg}`)
    }
  } catch (error) {
    console.error('An error occurred while scrapping data')
    console.error(error)
  } finally {
    await client.end()
    console.log('Database connection closed')
  }
})()
