const scraper = require('./scraper')
const Proffesor = require('./../models/Proffesor')

/**
 * Function that scrapes and stores in the database the proffesors
 * @param {Client} db
 */
async function professorsScraper (db) {
  await scraper(async (page) => {
    const data = []
    await getProfessorsRecursively(page, data)
    const dataReduced = data.reduce((acc, curr) => {
      if (!acc.some((item) => item.name === curr.name)) {
        acc.push(curr) // Agregar solo si el nombre es único
      }
      return acc
    }, [])
    await storeProfferos(db, dataReduced)
  })

  /**
   * Retrieve the professors data recursively
   * @param {import("playwright").Page} page
   * @param {Array<Proffesor>} data
   */
  async function getProfessorsRecursively (page, data) {
    let next100Button
    try {
      next100Button = await page.waitForSelector(
        'form[action="sspseca.consulta_oferta"] input[value="100 Próximos"]',
        { timeout: 5000 } // Puedes ajustar el tiempo de espera si es necesario
      )
    } catch {
      console.log(
        "Botón '100 Próximos' no encontrado, posiblemente en la última página."
      )
    }

    const allTr = await page.$$('table tbody tr:nth-child(n+3)')
    for (const tr of allTr) {
      const allTd = await tr.$$('td')
      if (allTd.length < 17) continue

      const profTd = await tr.$('.tdprofesor:last-of-type')
      const name = await profTd.textContent()
      data.push(new Proffesor(name))
    }

    if (next100Button) {
      await next100Button.click()
      await getProfessorsRecursively(page, data)
    } else {
      console.log('No hay más páginas para cargar.')
    }
  }
}

/**
 * Function that scrapes and stores in the database the proffesors
 * @param {Client} db
 * @param {Proffesor[]} data
 */
async function storeProfferos (db, data) {
  const values = []

  let query = 'INSERT INTO professors (name) VALUES '

  data.forEach((proffesor, i) => {
    query += `($${i + 1}),`
    values.push(proffesor.name)
  })

  query = query.slice(0, -1) + ';'

  await db.query(query, values)
  console.log('Datos insertados correctamente')
}
module.exports = professorsScraper
