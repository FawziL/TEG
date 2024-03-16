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

module.exports = {
  getAllUsers,
  logout,
};