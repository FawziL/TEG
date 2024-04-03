module.exports = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole !== 1) {
      return res.json({Error: 403, Mesage: "No tienes permiso de entrar a esta ruta."})
    }
    next();
  };