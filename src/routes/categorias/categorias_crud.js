const express = require('express');
const router = express.Router();

const categorias = require('../../models/categorias');

const auth = require('../../controllers/auth');

// Ruta para agregar una nueva categoria
router.post('/agregarcategorias', auth,(req, res)=>{
    if(req.body.categoria === ''){
      res.redirect('/crud/categorias/create?msg=Error, no se pudo agregar la categoria&class=alert alert-danger');
    }else{
      var newCategoria = new categorias({categoria:req.body.categoria});
      newCategoria.save().then(() => {
        res.redirect('/crud/categorias/create?msg=Categoria agregada&class=alert alert-success');
      }).catch((err) => {
        console.log(err);
      });
    }
});

// Ruta para acrualizar una categoria
router.post('/updatecategorias', auth,(req, res)=>{
    if(req.body.cat === ''){
      res.send("no se pudo agregar");
    }else{
      categorias.updateOne({_id:req.body.id},{categoria:req.body.cat}).then(() => {
        res.send('se agrego');
        }).catch((err) => {
          console.log(err);
        });
    }
});

// Ruta para eliminar una categoria
router.post('/deletecategorias', auth,(req, res)=>{
    categorias.deleteOne({_id:req.body.id}).then(() => {
      res.send('se elimino');
    }).catch((err) => {
      console.log(err);
    });
});

module.exports = router;
  