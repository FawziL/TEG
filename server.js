const express = require('express');
const app = express();
const path = require('path')
const rutas = require('./routes/index')
const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
});

const port = 8080;

app.use('/', rutas)

app.get('/users', (req, res) => {
  pool.query('SELECT * FROM tren', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al consultar la base de datos');
    } else {
      res.send(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});