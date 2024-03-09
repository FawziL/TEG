const { Router } = require('express')
const router = Router()
const path = require('path')
const controller = require('../controllers/userController');
const passport = require("../passport/passport.js");
const auth = require("../middlewares/isAuth")

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/home.html"));
});

router.get('/users', controller.getAllUsers);

router.get('/newProduct', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/products.html"))
});

router.post('/newProduct', controller.createProduct);

router.get('/putProduct/:id', controller.putProduct);

router.post('/putProduct/:id/update', controller.updateProduct);

router.get('/deleteProduct/:id', controller.deleteProduct);

router.get('/product/:id', controller.getProduct);

router.get('/products', auth , controller.getProducts);

router.get('/productsAdmin', auth , controller.getProductsAdmin);

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

router.get('/logout', controller.logout) 

module.exports = router