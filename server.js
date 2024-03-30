const express = require('express');
const app = express();
const rutas = require('./routes/index')
const session = require('express-session');
const passport = require("./passport/passport.js");
require('dotenv').config();
const { engine } = require('express-handlebars');
const path = require('path')

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 500000,
  },
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: path.join(__dirname, "/public/views/layout/main.hbs"),
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      },
      helpers: {
        ifEqual: function(v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
    })
);
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, "./public/views"));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', rutas)

app.listen(`${process.env.PORT}`, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});