const pool = require('../config/index');

async function getCart(id_user) {
  try {
    const result = await pool.query(`SELECT * FROM carrito WHERE id_usuario = $1`, [id_user]);
    return result.rows[0];
  } catch (error) {
    console.log(error)
  }
}

async function getProductsFromCart(id_user) {
  try {
    const id_carrito = await getCart(id_user)
    const result = await pool.query(`SELECT * FROM carrito_items WHERE id_carrito = $1`, [id_carrito.id]);
    return result.rows;
  } catch (error) {
    console.log(error)
  }
}

async function addProducts(idCarrito, idProducto, cantidad, precio) {
  try {
    const query = `
      INSERT INTO carrito_items (id_carrito, id_producto, cantidad, precio)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [idCarrito, idProducto, cantidad, precio];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error agregando producto al carrito:", error);
    throw error;
  }
}

//Obtenemos el id del carrito y el de producto para borrar ese producto de la tabla carrito_items

async function removeProductsFromCart(idCarrito, idProducto) {
  try {
    const query = `DELETE FROM carrito_items WHERE id_carrito = $1  AND id_producto = $2`;
    const values = [idCarrito, idProducto];
    await pool.query(query, values);
  } catch (error) {
    console.error(error)
  }
}

const buyCart = async (data) => {
  try{
      const query = `INSERT INTO ordenes_compra (id_usuario, productos, fecha_compra, estado, nombre_usuario, precio_total) VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5)`;
      let products = JSON.stringify(data.products)
      const values = [data.userId, products, 'pendiente', data.user, data.precioTotal];
      const result = await pool.query(query, values);
      const id_carrito = await getCart(data.userId)
      await pool.query(`DELETE FROM carrito_items WHERE id_carrito = $1`, [id_carrito.id]);
      return result.rows[0];
      }
      catch (error) {
        console.log(error)
      }
}
  
module.exports = {
    getCart,
    getProductsFromCart,
    addProducts,
    removeProductsFromCart,
    buyCart
  };