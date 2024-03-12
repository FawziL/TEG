const service = require('../services/cartService');

async function getProductsFromCart(req, res) {
  try {
    const productsFromCart = await service.getProductsFromCart(req.user.id);
    res.render('cart', { productsFromCart });
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
    const productInCart = await service.addProducts(cart.id, req.params.id)
    res.status(201).json({
      success: true,
      IdCart: cart,
      IdProduct: req.params.id,
      cart: productInCart,
    });
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
    const user = await service.removeProductsFromCart(req.params.idCart, req.params.idProduct);
    res.status(201).json({
      success: true,
      data: user,
    });
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
    removeProductsFromCart
};