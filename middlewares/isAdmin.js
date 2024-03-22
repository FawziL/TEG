module.exports = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === 1 || userRole === 2) {
      next();
    } else {
      res.json({Error: "No tienes permiso de estar aquí, chismoso"})
      return;
    }
  };