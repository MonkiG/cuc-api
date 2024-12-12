/* global process */
const { Pool, Client } = require('pg')

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
}

const pool = new Pool(dbConfig)

;(async () => {
  await pool.connect()
})().catch((e) => console.error(e))

const getClient = () => new Client(dbConfig)

module.exports = {
  pool,
  getClient
}
