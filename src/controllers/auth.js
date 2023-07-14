
const auth = function(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }
    try {
      const decoded = jwt.verify(token, 'token-secreto-');
      req.userId = decoded.userId;
      req.username = decoded.username;
      res.status(200).send({ message: "Acceso concedido", token });
      next();
    } 
};

module.exports = auth;