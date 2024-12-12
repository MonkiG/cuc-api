const BaseRepository = require('./BaseRepository')
const { pool } = require('./../../db-pgsql')

// const parseDays = (dayEnum) => dayEnum.slice(1, -1).split(',').map((day) => day.trim().replace(/'/g, ''))

class PgSubjectRepository extends BaseRepository {
  #db = pool

  async getAll () {
    const { rows } = await this.#db.query(/* sql */ `
      SELECT *, days::text[] FROM subjects;
    `)

    return rows
  }

  async get (id) {
    const {
      rows: [subject]
    } = await this.#db.query(
      /* sql */ `
      SELECT *, days::text[]  FROM subjects
      WHERE subjects.id = $1
    `,
      [id]
    )
    return subject
  }
}

module.exports = PgSubjectRepository
