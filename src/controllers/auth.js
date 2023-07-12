
const auth = function(req, res, next) {
    if (req.session){
      return next();
    }
    else{
      return res.send("<h1>No has sido autorizado, amigo. O tu sesion expiró.</h1><p><a href='/'>Regresar al login</a></p>");
    }
};

module.exports = auth;