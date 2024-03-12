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
    getProductsFromCart,
    addProducts,
    removeProductsFromCart
  };