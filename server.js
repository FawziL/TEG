const express = require('express');
const app = express();
const path = require('path')

const port = 8080;

app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor!');
});
app.get('/home', (req, res) => {
    
    res.sendFile(path.join(__dirname, "./public/index.html"))
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});