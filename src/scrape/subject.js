const Subject = require("../models/Subject");
const scraper = require("./scraper");

/**
 * Function that scrapes and stores in the database the subjects
 * @param {Client} db
 */
async function subjectScrapper(db) {
  // throw new Error("No implemented yet");
  await scraper(async (page) => {
    const data = [];
    await getSubjectsRecursively(page, data);
    await storeSubject(db, data);
  });

  /**
   * Retrieve the professors data recursively
   * @param {import("playwright").Page} page
   * @param {Array<Subject>} data
   */
  async function getSubjectsRecursively(page, data) {
    let next100Button;
    try {
      next100Button = await page.waitForSelector(
        'form[action="sspseca.consulta_oferta"] input[value="100 Próximos"]',
        { timeout: 5000 } // Puedes ajustar el tiempo de espera si es necesario
      );
    } catch {
      console.log(
        "Botón '100 Próximos' no encontrado, posiblemente en la última página."
      );
    }

    const allTr = await page.$$("table tbody tr:nth-child(n+3)");
    for (let tr of allTr) {
      const allTd = await tr.$$("td");
      if (allTd.length < 17) continue;

      const nrc = await allTd[0].textContent();
      const code = await allTd[1].textContent();
      const name = await allTd[2].textContent();
      const sec = await allTd[3].textContent();
      const cr = await allTd[4].textContent();
      const cup = await allTd[5].textContent();
      const dis = await allTd[6].textContent();

      const profTd = await tr.$(".tdprofesor:last-of-type");
      const profName = await profTd.textContent();

      const classDataTrs = await tr.$$("td table tr td");

      const ses = await classDataTrs[0].textContent();
      const hour = await classDataTrs[1].textContent();
      const daysStr = await classDataTrs[2].textContent();
      const days = daysStr
        .split(/[ .]+/)
        .map((item) => item.trim())
        .filter((item) => item !== "");
      const building = await classDataTrs[3].textContent();
      const classRoom = await classDataTrs[4].textContent();
      const period = await classDataTrs[5].textContent();

      const subject = new Subject(
        nrc,
        code,
        name,
        sec,
        cr,
        cup,
        dis,
        profName,
        ses,
        hour,
        days,
        building,
        classRoom,
        period
      );

      console.log(subject);
      data.push(subject);
    }

    if (next100Button) {
      await next100Button.click();
      await getSubjectsRecursively(page, data);
    } else {
      console.log("No hay más páginas para cargar.");
    }
  }
}

/**
 * Inserta varias materias en la base de datos.
 *
 * @param {object} db - La conexión a la base de datos.
 * @param {Array} data - Array de materias a insertar. Cada elemento debe incluir nrc, code, credits, spaces, available_spaces, professorName, ses, hour, days, building, classroom, period.
 */
async function storeSubject(db, data) {
  const values = [];

  let query = `
    INSERT INTO subjects (
      nrc, 
      code, 
      name,
      sec,
      credits, 
      spaces, 
      available_spaces, 
      professor_id, 
      ses, 
      hour, 
      days, 
      building, 
      classroom, 
      period
    ) VALUES `;

  for (const subject of data) {
    // Obtener el `professor_id` para el profesor de la materia actual
    const { rows } = await db.query(
      "SELECT id FROM professors WHERE name = $1",
      [subject.proffesorName]
    );
    const professorId = rows[0]?.id;

    // Verificar si se encontró el profesor
    if (!professorId) {
      console.error(
        `No se encontró el profesor con nombre: ${subject.proffesorName}`
      );
      continue; // Salta esta iteración si no se encuentra el profesor
    }

    // Agregar los valores de la materia en la consulta
    query += `($${values.length + 1}, $${values.length + 2}, $${
      values.length + 3
    }, $${values.length + 4}, $${values.length + 5}, $${values.length + 6}, $${
      values.length + 7
    }, $${values.length + 8}, $${values.length + 9}, $${values.length + 10}, $${
      values.length + 11
    }, $${values.length + 12}, $${values.length + 13}, $${
      values.length + 14
    }),`;

    values.push(
      subject.nrc,
      subject.code,
      subject.name,
      subject.sec,
      subject.cr,
      subject.cup,
      subject.dis,
      professorId,
      subject.ses,
      subject.hour,
      subject.days,
      subject.building,
      subject.classroom,
      subject.period
    );
  }

  // Quitar la última coma y añadir un punto y coma final
  query = query.slice(0, -1) + ";";

  try {
    await db.query(query, values);
    console.log("Datos insertados correctamente");
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
  }
}

module.exports = subjectScrapper;
