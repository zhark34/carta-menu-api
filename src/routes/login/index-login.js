const express = require('express');
const app = express();

session = require('express-session');

const admins = require('../../models/admins');

const auth = require('../../controllers/auth');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret:  process.env.SECRETSESSION,
    name: 'sessionId',
    proxy: true,
    resave: true,
    saveUninitialized: true ,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.post('/loguear', auth, (req, res)=>{

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers","Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");

  admins.find({ usuario: req.body.user, password: req.body.pass })
  .exec()
  .then(user => {

    if(user.length === 1){
      req.session.user = req.body.user;
      req.session.admin = req.body.pass;
      const f = Date.now();
      res.status(200).send({"login":1,"message":"Aceso concedido","token":"token-secreto-"+f});
    }
    else{
        res.status(200).send({"login":0,"message":"User y/o password no son correctos"});
    }
  })
});

app.all('/chek', auth, ), (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers","Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
  const f = Date.now();
  res.status(200).send({"login":1,"message":"Aceso concedido","token":"token-secreto-"+f});
}

app.all('/logout', function (req, res) {
  req.session.destroy();
  res.send("<h1>Sesión cerrada! Regresar al <a href='/'>Home</a><h1>");
});

app.use(require('../platos/platos_crud') ,auth);

app.use(require('../categorias/categorias_crud') ,auth);

module.exports = app;