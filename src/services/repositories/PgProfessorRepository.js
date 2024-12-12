const BaseRepository = require('./BaseRepository')
const { pool } = require('./../../db-pgsql')

/**
 * Professor repository that use PostgreSql pool
 * @class
 */
class PgProfessorRepository extends BaseRepository {
  #db = pool

  async getAll () {
    const { rows } = await this.#db.query(/* sql */ `
      SELECT professors.*, ARRAY_AGG(subjects.id) AS subjects
      FROM subjects
      INNER JOIN professors ON subjects.professor_id = professors.id
      GROUP BY professors.id;
    `)

    return rows
  }

  async get (id) {
    const {
      rows: [professor]
    } = await this.#db.query(
      /* sql */ `
      SELECT professors.*, ARRAY_AGG(subjects.id) AS subjects
      FROM subjects
      INNER JOIN professors ON subjects.professor_id = professors.id
      WHERE professors.id = $1
      GROUP BY professors.id;
    `,
      [id]
    )

    return professor
  }
}

module.exports = PgProfessorRepository
