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

async function putRole(req, res) {
  try {
    await service.putRole(req.params.id, req.body.role);
    res.redirect('/users')
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function logout (req, res, next) {
  let username = req.user.username;
  req.logout(function (err) {
    if (err) {
      return res.status(500).send('Hubo un problema al cerrar la sesión');
    }
  
    res.render('logout', { username });
  });

};

module.exports = {
  getAllUsers,
  putRole,
  logout,
};