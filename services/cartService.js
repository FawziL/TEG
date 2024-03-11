const pool = require('../config/index');

async function getCart(id_user) {
  try {
    const result = await pool.query(`SELECT * FROM carrito WHERE id_usuario = $1`, [id_user]);
    return result.rows[0];
  } catch (error) {
    console.log(error)
  }
}

async function addProducts(idCarrito, idProducto) {
  try {
    const query = `
      INSERT INTO carrito_items (id_carrito, id_producto)
      VALUES ($1, $2) RETURNING *`;
    const values = [idCarrito, idProducto];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error agregando producto al carrito:", error);
    throw error;
  }
}

async function deleteProductsFromCart(idUsuario, idProducto) {
    const query = `
      DELETE FROM carrito_items
      WHERE id_usuario = $1 AND id_producto = $2
    `;
    const values = [idUsuario, idProducto];
    await pool.query(query, values);
}

const buyCart = async (email) => {
    try{
        const cart = await Cart.getByemail(email)
        const orderArray = cart.productos
        const order1 = orderArray
        await Order.save(email, order1)
        await Cart.buyCart(cart)
        return cart
      }
      catch (error) {
        console.log(error)
      }
  }
  
module.exports = {
    getCart,
    addProducts,
  };