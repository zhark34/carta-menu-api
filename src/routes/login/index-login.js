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
  admins.find({ usuario: req.body.user, password: req.body.pass })
  .exec()
  .then(user => {
    if (user.length === 0) {
      res.send("error al loguear");
    } else{
      req.session.user = req.body.user;
      req.session.admin = req.body.password;
      res.send("logueado");
    }
  })
});

app.all('/logout', function (req, res) {
  req.session.destroy();
  res.send("<h1>Sesión cerrada! Regresar al <a href='/'>Home</a><h1>");
});

app.use(require('../platos/platos_crud') ,auth);

app.use(require('../categorias/categorias_crud') ,auth);

module.exports = app;