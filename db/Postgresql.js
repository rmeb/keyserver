/**
* Definir la variable de entorno DATABASE_URL con el string de conección de postgresql
**/
if (!process.env.DATABASE_URL) {
  throw new Error('Variable de entorno DATABASE_URL requerida para operar con postgresql.')
}

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

function query(sql, values) {
  return pool.query(sql, values)
}

module.exports = {
  query
}
