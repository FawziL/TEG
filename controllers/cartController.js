const service = require('../services/cartService');

async function getCart(req, res) {
  try {
    const cart = await service.getCart(req.user.id);
    console.log(cart)
    res.render('cart', { cart });
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

module.exports = {
    getCart,
    addProduct,
};