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
    if(!await tableExists('carrito_items')){
      const query = `
      CREATE TABLE carrito_items (
        id_carrito_item SERIAL PRIMARY KEY,
        id_carrito INTEGER NOT NULL,
        id_producto INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        precio INTEGER NOT NULL,
        FOREIGN KEY (id_producto) REFERENCES productos(id)
      );`;
      await pool.query(query);
    }
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
    if(!await tableExists('ordenes_compra')){
        const query = `
        CREATE TABLE ordenes_compra (
          id_orden_compra SERIAL PRIMARY KEY,
          id_usuario INTEGER NOT NULL,
          productos JSONB NOT NULL,
          fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          estado VARCHAR(255) NOT NULL,
          nombre_usuario VARCHAR(255) NOT NULL,
          precio_total DECIMAL(10,2) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone_number VARCHAR(255) NOT NULL
        );`;
        await pool.query(query);
    }
    const query = `INSERT INTO ordenes_compra (id_usuario, productos, fecha_compra, estado, nombre_usuario, precio_total, email, phone_number) VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6, $7)`;
    let products = JSON.stringify(data.products)
    const values = [data.userId, products, 'Pendiente', data.user, data.precioTotal, data.email, data.phoneNumber];
    const result = await pool.query(query, values);
    const id_carrito = await getCart(data.userId)
    await pool.query(`DELETE FROM carrito_items WHERE id_carrito = $1`, [id_carrito.id]);
    return result.rows[0];
  }
  catch (error) {
    console.log(error)
  }
}
async function tableExists(tableName) {
  const result = await pool.query(
    `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = $1
    );
    `,
    [tableName]
  );
  return result.rows[0].exists;
}
  
module.exports = {
  getCart,
  getProductsFromCart,
  addProducts,
  removeProductsFromCart,
  buyCart
};