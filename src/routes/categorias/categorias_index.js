const express = require('express');
const router = express.Router();
const cors = require('cors');

//Traigo el schema de la categorias
const categorias = require('../../models/categorias');
//Traigo el schema de menu
const menu = require('../../models/menu');

router.use(cors());

// Definición de ruta para la página principal de categorias
router.get('/api/categorias', (req, res)=>{
  categorias.find().then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(data);
  });
});

// Ruta para mostrar los platos que hay en una categoria
router.get('/api/categoria/:id', (req, res)=>{
  menu.find({categoria:req.params.id}).then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(data);
  });
});

module.exports = router;