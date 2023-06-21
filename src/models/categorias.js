var mongoose = require('mongoose');  
var CategoriasSchema  = new mongoose.Schema({  
    id: Number,
    plato: String,
    photo: String,
    description: String,
    categoria: String
});

module.exports = mongoose.model('categorias', CategoriasSchema);