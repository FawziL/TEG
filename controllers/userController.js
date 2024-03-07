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

async function createProduct(req, res) {
    try {
      console.log(req.body)
      const user = await service.createProduct(req.body.name, req.body.email);
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
  getAllUsers,
  createProduct
};