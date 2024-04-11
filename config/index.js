const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString:`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
});

module.exports = pool;