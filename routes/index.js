const { Router } = require('express')
const router = Router()
const path = require('path')
const controller = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('¡Hola desde el servidor!');
});
  
router.get('/home', (req, res) => {  
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

router.get('/users', controller.getAllUsers);

router.post('/newUser', controller.createUser);

module.exports = router