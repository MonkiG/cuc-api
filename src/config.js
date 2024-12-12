/* global process */
const config = {
  scrapeURl: 'http://consulta.siiau.udg.mx/wco/sspseca.forma_consulta',
  universityCenterSelectValue: 'I',
  PORT: process.env.PORT ?? 3000,
  ENV: process.env.ENV
}

module.exports = config
