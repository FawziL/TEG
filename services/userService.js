const pool = require('../config/index');

function getUsers() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM usuarios', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.rows);
      }
    });
  });
}
async function createProduct(name, email) {
    const query = `INSERT INTO tren (modelo, capacidad) VALUES ($1, $2) RETURNING *`;
    const values = [name, email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = {
  getUsers,
  createProduct
};