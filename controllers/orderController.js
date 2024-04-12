const service = require('../services/orderService');

async function getOrders(req, res) {
  try {
    const orderUser = await service.getOrders();
    res.render('ordersAdmin', {orderUser});
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function getOrder(req, res) {
    try {
      const orderUser = await service.getOrder(req.user.id);
      res.render('orderUser', { orderUser });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
}

async function putStatusCart(req, res) {
  try {
    await service.putStatusCart(req.params.id, req.body.status);
    res.redirect('/orders')
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getOrders,
  getOrder,
  putStatusCart,
};