const pool = require('../config/index');

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
  
async function createProduct(name, price, description, category, img) {
  try {
    const image = `/imgs/${img}`
    const query = `INSERT INTO productos (name, price, description, category, img) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [name, price, description, category, image];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}
  
async function putProduct(name, price, description, category, id) {
  try {
    const result = await pool.query(
      `UPDATE productos SET name = $1, price = $2, description = $3, category = $4 WHERE id = $5`,
      [name, price, description, category, id]
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

async function getProductByCategory(category) {
  try {
    const result = await pool.query(`SELECT * FROM productos WHERE category = $1`, [category]);
    return result.rows;
  } catch (error) {
    return{
      success: false,
      error: error.message,
    };
  }
}
  
module.exports = {
  getProducts,
  createProduct,
   putProduct,
  deleteProduct,
  getProduct,
  getProductByCategory 
};