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
    if (req.body.user && req.body.pass) {
        var query = {$and: [{user: req.body.user}, {password: req.body.pass}]};
            if (err) return res.status(200).send({"login":0,"error":"Error Interno"});            
            if(data.length>0){       
                req.session.user = req.body.user;
                req.session.admin = req.body.pass;
                const f = Date.now();
                res.status(200).send({"login":1,"name":data[0].name,"token":"token-secreto-"+f});
            }
            else{
                res.status(200).send({"login":0,"Error":"Usuario o Contraseña incorrecto/s. Intenta con otros datos."});
            }
    }
    else{
        res.status(200).send({"login":0,"error":"User y/o password no son correctos"});
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