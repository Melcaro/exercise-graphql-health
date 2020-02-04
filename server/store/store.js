const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '192.168.99.100',
  database: 'healthapp',
  password: '',
  port: 5002,
});

let client = null;

async function createDB() {
  client = await pool.connect();
  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  return client;
}

createDB();
module.exports = { createDB };
