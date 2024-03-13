const pool = require('../config/index');

async function getOrders() {
  try {
    const result = await pool.query(`SELECT * FROM ordenes_compra`);
    return result.rows;
  } catch (error) {
    console.log(error)
  }
}

async function getOrder(id_user) {
  try {
    const result = await pool.query(`SELECT * FROM ordenes_compra WHERE id_usuario = $1`, [id_user]);
    return result.rows;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    getOrders,
    getOrder,
  };