const express = require('express');
const router = express.Router();

//Traigo el schema de menu
const menu = require('../../models/menu');

// Definición de ruta para la página principal
router.get('/', (req, res)=>{
  menu.find().then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
  });
  });

module.exports = router;