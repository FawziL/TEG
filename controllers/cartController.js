const service = require('../services/cartService');

async function getProductsFromCart(req, res) {
  try {
    const productsFromCart = await service.getProductsFromCart(req.user.id);
    let totalPrecio = 0;

    const dataCarrito = {
      products: productsFromCart.map(item => {
        totalPrecio += item.precio * item.cantidad;
        return {
          idCarritoItem: item.id_carrito_item,
          idCarrito: item.id_carrito,
          idProducto: item.id_producto,
          precio: item.precio,
          cantidad: item.cantidad,
          total: item.precio * item.cantidad
        };
      }),
      user: req.user.username,
      userId: req.user.id,
      precioTotal: totalPrecio
    };
    const data = JSON.stringify(dataCarrito)
    res.render('cart', { productsFromCart, data, totalPrecio });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function addProduct(req, res) {
  try {
    const cart = await service.getCart(req.user.id);
    const cantidad = parseInt(req.body.cantidad)
    const precio = parseInt(req.body.price)
    await service.addProducts(cart.id, req.params.id, cantidad, precio)
    res.redirect('/cart');
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

//Obtenemos el id del carrito y el de producto desde los parametros URL, para ejecutar el remove del service

async function removeProductsFromCart(req, res) {
  try {
    await service.removeProductsFromCart(req.params.idCart, req.params.idProduct);
    res.redirect('/cart');
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function buyCart(req, res) {
  try {
    const cartData = JSON.parse(req.body.data)
    await service.buyCart(cartData);
    res.redirect('/order');
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}


module.exports = {
  getProductsFromCart,
  addProduct,
  removeProductsFromCart,
  buyCart
};