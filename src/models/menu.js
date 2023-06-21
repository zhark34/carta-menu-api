var mongoose = require('mongoose');  
var MenusSchema  = new mongoose.Schema({  
    id: Number,
    plato: String,
    photo: String,
    description: String,
    categoria: String
});

module.exports = mongoose.model('menus', MenusSchema);