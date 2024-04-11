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

  const createTable = `
  SELECT EXISTS (
    SELECT 1
    FROM   information_schema.tables 
    WHERE  table_schema = 'public'
    AND    table_name = 'usuarios'
  );
  `;
  const resultTable = await db.query(createTable);
  if(!resultTable.rows[0].exists){
    const query = `
    CREATE TABLE usuarios (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role VARCHAR(255) NOT NULL,
      phone_number VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL
    );`
    await db.query(query);
  }

  // Registrar el usuario en la base de datos
  const user = await db.query(
  'INSERT INTO usuarios (username, password, email, role, phone_number, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING *', 
  [username, hashedPassword, email, 1, phoneNumber, firstName, lastName]);

  const createTableCart = `
  SELECT EXISTS (
    SELECT 1
    FROM   information_schema.tables 
    WHERE  table_schema = 'public'
    AND    table_name = 'carrito'
  );
  `;
  const resultTableCart = await db.query(createTableCart);
  if(!resultTableCart.rows[0].exists){
    const query = `
    CREATE TABLE carrito (
      id SERIAL PRIMARY KEY,
      id_usuario INT NOT NULL,
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id) 
    );`;
    await db.query(query);
  }
  // Crear el carrito del usuario en la base de datos
  const cart  = await db.query('INSERT INTO carrito (id_usuario) VALUES ($1) RETURNING *', [user.rows[0].id]);

  return { success: true, usuario: user.rows[0], carrito: cart.rows[0]  };
};

module.exports = passport;