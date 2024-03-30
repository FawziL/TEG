const pool = require('../config/index');

async function getUsers() {
  try {
    const result = await pool.query(`SELECT * FROM usuarios WHERE role IN (2,3)`);
    return result.rows;
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}

async function putRole(id, role) {
  try {
    const result = await pool.query(`UPDATE usuarios SET role = $1 WHERE id = $2`, [role, id]);
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
  putRole,
};