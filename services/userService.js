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

async function getProducts() {
  try {
    const result = await pool.query(`SELECT * FROM productos`);
    return result.rows;
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}

async function createProduct(name, price) {
  try {
    const query = `INSERT INTO productos (name, price) VALUES ($1, $2) RETURNING *`;
    const values = [name, price];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}

async function putProduct(name, price, id) {
  try {
    const result = await pool.query(
      `UPDATE productos SET name = $1, price = $2 WHERE id = $3`,
      [name, price, id]
    );
    return result.rowCount;
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}

async function deleteProduct(id) {
  try {
    const result = await pool.query(`DELETE FROM productos WHERE id = $1`, [id]);
    return result.affectedRows;
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}
 
async function getProduct(id) {
  try {
    const result = await pool.query(`SELECT * FROM productos WHERE id = $1`, [id]);
    return result.rows[0];
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  getUsers,
  getProducts,
  createProduct,
  putProduct,
  deleteProduct,
  getProduct
};