const service = require('../services/userService');

async function getAllUsers(req, res) {
  try {
    const users = await service.getUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function getProducts(req, res) {
  try {
    const users = await service.getProducts();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function createProduct(req, res) {
  try {
    const user = await service.createProduct(req.body.name, req.body.price);
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

async function putProduct(req, res) {
  try {
    const user = await service.putProduct(req.body.name, req.body.price, req.body.id);
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

async function deleteProduct(req, res) {
  try {
    const user = await service.deleteProduct(req.body.id);
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

async function getProduct(req, res) {
  try {
    const product = await service.getProduct(req.body.id);
    console.log(product)
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getAllUsers,
  getProducts,
  createProduct,
  putProduct,
  deleteProduct,
  getProduct
};