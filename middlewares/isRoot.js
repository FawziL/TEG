module.exports = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole !== 1) {
      res.json({Error: "No tienes permiso de estar aquí, chismoso"})
      return;
    }
    next();
  };