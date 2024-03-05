const pool = require('../config/index');

function getUsers() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM tren', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
}
async function createUser(name, email) {
    const query = `INSERT INTO tren (modelo, capacidad) VALUES ($1, $2) RETURNING *`;
    const values = [name, email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = {
  getUsers,
  createUser
};