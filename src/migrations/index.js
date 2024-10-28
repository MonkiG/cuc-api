const { seedTables } = require("./tables");
const { getClient } = require("../db-pgsql");

async function main() {
  const client = getClient();
  try {
    console.log("Connecting to database");
    await client.connect();
    console.log("Connected successfully");

    await seedTables(client);
  } catch (e) {
    console.error("Error en la base de datos");
    console.error(e);
  } finally {
    client.end();
    console.log("Cliente desconectado");
  }
}

main();
