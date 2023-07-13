
const auth = function(req, res, next) {
    if (req.session && req.session.user && req.session.pass){
      return next();
    }
    else{
      return res.send({login:0,"message":"Aceso Denegado"});
    }
};

module.exports = auth;