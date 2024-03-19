const { Router } = require('express')
const router = Router()
const path = require('path')
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const passport = require("../passport/passport.js");
const auth = require("../middlewares/isAuth")
const upload = require ('../multer/multer.js')

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/home.html"));
});

router.get('/users', userController.getAllUsers);

router.get('/newProduct', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/products.html"))
});

router.post('/newProduct', upload.single('img'), productController.createProduct);

router.get('/putProduct/:id', productController.putProduct);

router.post('/putProduct/:id/update', productController.updateProduct);

router.get('/deleteProduct/:id', productController.deleteProduct);

router.get('/product/:id', productController.getProduct);

router.get('/products' , productController.getProducts);

router.get('/productsAdmin', auth, productController.getProductsAdmin);

router.get('/cart', auth, cartController.getProductsFromCart);

router.post('/addProduct/:id', auth, cartController.addProduct);

router.post('/removeProductFrom/:idCart/:idProduct', auth, cartController.removeProductsFromCart);

router.post('/buyCart', auth, cartController.buyCart);

router.get('/orders', orderController.getOrders);

router.get('/order', auth, orderController.getOrder);

router.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/login.html"))
});
  
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));
  
router.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/register.html"));
});
  
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const result = await passport.register(username, password);

  if (result.success) {
    res.redirect('/login');
  } else {
    res.status(400).json({ error: 'Error al registrar al usuario' });
  }
});

router.get('/logout', auth, userController.logout) 

module.exports = router