const service = require('../services/productService');

async function getProducts(req, res) {
    try {
      const products = await service.getProducts();
      const user = req?.user;
      res.render('products', { products, user });
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
      await service.createProduct(req.body.name, req.body.price, req.body.description, req.body.category, req.file.filename);
      res.redirect('/productsAdmin');
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
      const product = await service.getProduct(productId);
      res.render("putProduct", { id: productId, product });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
  const updateProduct = async (req, res) => {
    try {
      await service.putProduct(req.body.name, req.body.price, req.body.description, req.body.category, req.params.id)
      res.redirect('/productsAdmin');
    } catch (err) {
      console.log(err);
    }
  };
  
  async function deleteProduct(req, res) {
    try {
      await service.deleteProduct(req.params.id);
      res.redirect('/productsAdmin');
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
      const user = req?.user;
      res.render('productID', { product, user });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async function getProductByCategory(req, res) {
    try {
      const products = await service.getProductByCategory(req.params.category);
      const user = req?.user;
      console.log(products)
      res.render('products', { products, user });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }


  module.exports = {
    getProductsAdmin,
    getProducts,
    createProduct,
    putProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductByCategory
  };