const express = require('express');
const app = express();
const path = require('path')
const rutas = require('./routes/index')

const port = 8080;

app.use('/', rutas)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});