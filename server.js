const express = require('express');
const app = express();
const rutas = require('./routes/index')
const session = require('express-session');
const passport = require("./passport/passport.js");

const port = 8080;

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', rutas)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});