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

passport.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Registrar el usuario en la base de datos
  await db.query('INSERT INTO usuarios (username, password) VALUES ($1, $2)', [username, hashedPassword]);

  return { success: true };
};

module.exports = passport;