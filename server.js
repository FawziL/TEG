const express = require('express');
const app = express();
const rutas = require('./routes/index')

const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', rutas)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});