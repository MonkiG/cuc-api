/**
 * Seed the datanase with the tables
 * @param {Pool} db
 * @returns {Promise<void>}
 */
async function seedTables(db) {
  //Create the days enum
  await db.query(DAYS_ENUM);

  //Create the tables
  await db.query(SUBJECTS_TABLE);
  await db.query(PROFESSORS_TABLE);
}

const DAYS_ENUM = `
    DROP TABLE IF EXISTS subjects CASCADE;
    DROP TYPE IF EXISTS days CASCADE;
    CREATE TYPE days AS ENUM ('L', 'M', 'I', 'J', 'V', 'S');
`;

const SUBJECTS_TABLE = `
    CREATE TABLE subjects(
        id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        nrc INTEGER NOT NULL UNIQUE,
        code TEXT NOT NULL,
        credits SMALLINT NOT NULL,
        spaces SMALLINT NOT NULL,
        available_spaces SMALLINT NOT NULL,
        ses SMALLINT NOT NULL,
        hour TEXT NOT NULL,
        days days[] NOT NULL,
        building TEXT NOT NULL,
        classroom TEXT NOT NULL,
        period TEXT NOT NULL,
        professor_id UUID NOT NULL,
        sec TEXT NOT NULL
    );
`;

const PROFESSORS_TABLE = `
    CREATE TABLE IF NOT EXISTS professors(
        id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
        name TEXT NOT NULL UNIQUE
    );
`;

module.exports = {
  seedTables,
};
