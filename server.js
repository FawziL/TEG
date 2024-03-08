const express = require('express');
const app = express();
const rutas = require('./routes/index')
const session = require('express-session');
const passport = require("./passport/passport.js");
require('dotenv').config();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', rutas)

app.listen(`${process.env.PORT}`, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});