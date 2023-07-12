
const auth = function(req, res, next) {
    if (req.session && req.session.user){
      return next();
    }
    else{
      return res.send({login:0,"message":"Aceso Denegado"});
    }
};

module.exports = auth;