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
      console.log('chao')
      console.log(name, price, description, category, img);
      const query = `INSERT INTO productos (name, price, description, category, img) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const values = [name, price, description, category, img];
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
    getProducts,
    createProduct,
    putProduct,
    deleteProduct,
    getProduct
};