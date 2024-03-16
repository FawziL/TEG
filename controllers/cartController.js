const service = require('../services/cartService');

async function getProductsFromCart(req, res) {
  try {
    const productsFromCart = await service.getProductsFromCart(req.user.id);
    const dataCarrito = {
      products: productsFromCart.map(item => ({
        idCarritoItem: item.id_carrito_item,
        idCarrito: item.id_carrito,
        idProducto: item.id_producto,
      })),
      user: req.user.username,
      userId: req.user.id,
    };
    const data = JSON.stringify(dataCarrito)
    res.render('cart', { productsFromCart, data});
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

async function buyCart(req, res) {
  try {
    const cartData = JSON.parse(req.body.data)
    const cart = await service.buyCart(cartData);
    res.status(201).json({
      success: true,
      data: cart,
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
    removeProductsFromCart,
    buyCart
};