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
