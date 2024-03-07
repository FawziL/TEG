const { Router } = require('express')
const router = Router()
const path = require('path')
const controller = require('../controllers/userController');
const passport = require("../passport/passport.js");

router.get('/', (req, res) => {
    res.send('¡Hola desde el servidor!');
});

router.get('/users', controller.getAllUsers);

router.post('/newProduct', controller.createProduct);

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"))
  });
  
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
  }));
  
router.get('/home', (req, res) => {
    // Mostrar la página de inicio solo si el usuario está autenticado
    if (req.isAuthenticated()) {
      res.send('¡Bienvenido a casa!');
    } else {
      res.redirect('/login');
    }
});
  
router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/..public/register.html');
});
  
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const result = await passport.register(username, password);
  
    if (result.success) {
      res.redirect('/login');
    } else {
      // Mostrar mensaje de error
      res.status(400).json({ error: 'Error al registrar al usuario' });
    }
});

module.exports = router