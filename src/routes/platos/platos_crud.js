const express = require('express');
const router = express.Router();

const menu = require('../../models/menu');

const auth = require('../../controllers/auth');

// Ruta para agregar un nuevo plato
router.post('/agegarproductos', auth,(req, res)=>{
    var t = new Date();
    var NewPlato = new menu({
      id: t.getTime(),
      plato: req.body.titulo,
      photo: req.body.foto,
      description: req.body.descripcion,
      categoria: req.body.categoria
    });
    
    NewPlato.save().then(() => {
        res.send("Agregado");
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/updateproductos', auth,(req, res)=>{
  menu.updateOne({id:req.body.id}, {plato: req.body.titulo, photo: req.body.photo, description: req.body.descripcion, categoria: req.body.categoria}).then(() => {
    res.send("Updateado");
  }).catch((err) => {
      console.log(err);
  });
});

router.post('/deleteproductos', auth,(req, res)=>{
  menu.deleteOne({id:req.body.id}).then(()=>{
    res.redirect("Eliminado");
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router;