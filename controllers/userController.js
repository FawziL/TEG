const service = require('../services/userService');

async function getAllUsers(req, res) {
  try {
    const users = await service.getUsers();
    res.render('users', { users });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function logout (req, res, next) {
  let user = req.user.username;
  req.logout(function (err) {
    if (err) return next(err);
    res.send(`<h1>Hasta luego ${user}</h1>
          <script type="text/javascript">
          setTimeout(function(){ location.href = '/login'},2000)
          </script>`);
  });
};

async function getProducts(req, res) {
  try {
    const products = await service.getProducts();
    res.render('products', { products });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
async function getProductsAdmin(req, res) {
  try {
    const products = await service.getProducts();
    res.render('productsAdmin', { products });
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
    const productId = req.params.id;
    res.render("putProduct", { id: productId });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
const updateProduct = async (req, res) => {
  try {
    const product = await service.putProduct(req.body.name, req.body.price, req.params.id)
    console.log(req.body.name, req.body.price, req.params.id)
    res.status(201).json({
      success: true,
      data: product,
      envio: "El producto fue editado"
    });
  } catch (err) {
    console.log(err);
  }
};

async function deleteProduct(req, res) {
  try {
    const user = await service.deleteProduct(req.params.id);
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
    const product = await service.getProduct(req.params.id);
    res.render('productID', { product });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getAllUsers,
  logout,
  getProductsAdmin,
  getProducts,
  createProduct,
  putProduct,
  updateProduct,
  deleteProduct,
  getProduct
};