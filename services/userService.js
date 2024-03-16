const pool = require('../config/index');

async function getUsers() {
  try {
    const result = await pool.query(`SELECT * FROM usuarios`);
    return result.rows;
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  getUsers,
};