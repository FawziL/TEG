const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../config/index.js');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},

async (username, password, done) => {
  const user = await db.query('SELECT * FROM usuarios WHERE username = $1', [username]);
  if (!user.rows.length) {
    return done(null, false, { message: 'Usuario no encontrado' });
  }
  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) {
    return done(null, false, { message: 'Contraseña incorrecta' });
  }
  return done(null, user.rows[0]);
})); 

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  if (!user.rows.length) {
    return done(null, false);
  }
  done(null, user.rows[0]);
});

passport.register = async (username, password, email, phoneNumber, firstName, lastName) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Registrar el usuario en la base de datos
  const user = await db.query(
  'INSERT INTO usuarios (username, password, email, role, phone_number, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING *', 
  [username, hashedPassword, email, 3, phoneNumber, firstName, lastName]);

  // Crear el carrito del usuario en la base de datos
  const cart  = await db.query('INSERT INTO carrito (id_usuario) VALUES ($1) RETURNING *', [user.rows[0].id]);

  return { success: true, usuario: user.rows[0], carrito: cart.rows[0]  };
};

module.exports = passport;