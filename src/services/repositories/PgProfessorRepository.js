const BaseRepository = require("./BaseRepository");
const { pool } = require("./../../db-pgsql");

/**
 * Professor repository that use PostgreSql pool
 * @class
 */
class PgProfessorRepository extends BaseRepository {
  #db = pool;
  constructor() {
    super();
  }

  async getAll() {
    const { rows } = await this.#db.query(`
      SELECT subjects.id AS subject_id, professors.*
      FROM subjects
      INNER JOIN professors ON subjects.professor_id = professors.id;
    `);
    return rows;
  }

  async get(id) {
    const { rows } = await this.#db.query(
      `
      SELECT subjects.id AS subject_id, professors.*
      FROM subjects
      INNER JOIN professors ON subjects.professor_id = professors.id
      WHERE professors.id = $1
    `,
      [id]
    );

    return rows;
  }
}

module.exports = PgProfessorRepository;
