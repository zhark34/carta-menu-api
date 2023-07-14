const express = require('express');

const app = express();

session = require('express-session');

const admins = require('../../models/admins');

const auth = require('../../controllers/auth');

const jwt = require('jsonwebtoken');

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

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, 'token-secreto-', { expiresIn: '1h' });

  return token;
};


app.post('/loguear', (req, res)=>{

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers","Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");

  const usuario = req.body.user;

  const pass = req.body.pass;

  admins.find({ usuario: usuario, password: pass })
  .exec()
  .then(user => {

    if(user.length === 1){
      const token = jwt.sign({ userId: user.id, username: user.username }, 'secret-key'); // Replace 'secret-key' with your own secret key
      res.status(200).send({ login: 1, message: 'Acceso concedido', token: token });
      res.status(200).send({login:1,message:"Aceso concedido", token:token});
    }
    else{
        res.status(200).send({login:0,message:"User y/o password no son correctos"});
    }
  }).catch(error => {
    console.error('Error al buscar usuarios:', error);
    res.status(500).send({ login: 0, message: 'Error en el servidor' });
  });
});

app.all('/logout', function (req, res) {
  req.session.destroy();
  res.send("<h1>Sesión cerrada! Regresar al <a href='/'>Home</a><h1>");
});

app.use(require('../platos/platos_crud') ,auth);

app.use(require('../categorias/categorias_crud') ,auth);

module.exports = app;