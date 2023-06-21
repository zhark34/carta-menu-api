const express = require('express');
const router = express.Router();
const cors = require('cors');

//Traigo el schema de la categorias
const categorias = require('../../models/categorias');
//Traigo el schema de menu
const menu = require('../../models/menu');

router.use(cors());

router.get('/api/plato', (req, res)=>{
  menu.find().then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
  });
});

// Ruta para mostrar un plato específico
  router.get('/api/plato/:id', (req, res)=>{
    menu.findOne({"plato": req.params.id}).then((data) => {
        res.send(data);
      }).catch((err) => {
        console.log(err);
      });
  });

module.exports = router;