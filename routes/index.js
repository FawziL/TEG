const { Router } = require('express')
const router = Router()
const path = require('path')
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const passport = require("../passport/passport.js");
const auth = require("../middlewares/isAuth")
const root = require("../middlewares/isRoot")
const admin = require("../middlewares/isAdmin")
const upload = require ('../multer/multer.js')

router.get('/', (req, res) => {
  const userRole = req.user?.role;
  if (userRole === 1 || userRole === 2) {
    res.redirect("/productsAdmin")
  } else {
    res.sendFile(path.resolve(__dirname, "../public/home.html"));
  }
});

router.get('/users', auth, root, userController.getAllUsers)

router.get('/newProduct', auth, admin, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/products.html"))
});

router.post('/newProduct', upload.single('img'), productController.createProduct);

router.get('/putProduct/:id', auth, admin, productController.putProduct);

router.post('/putProduct/:id/update', auth, admin, productController.updateProduct);

router.get('/deleteProduct/:id',auth, admin, productController.deleteProduct);

router.get('/product/:id', productController.getProduct);

router.get('/products', productController.getProducts);

router.get('/productsAdmin', auth, admin, productController.getProductsAdmin);

router.get('/cart', auth, cartController.getProductsFromCart);

router.post('/addProduct/:id', auth, cartController.addProduct);

router.post('/removeProductFrom/:idCart/:idProduct', auth, cartController.removeProductsFromCart);

router.post('/buyCart', auth, cartController.buyCart);

router.get('/orders', auth, admin, orderController.getOrders);

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
  const { username, password, email, phoneNumber, firstName, lastName } = req.body;
  const result = await passport.register(username, password, email, phoneNumber, firstName, lastName);

  if (result.success) {
    res.redirect('/login');
  } else {
    res.status(400).json({ error: 'Error al registrar al usuario' });
  }
});

router.get('/logout', auth, userController.logout) 

module.exports = router