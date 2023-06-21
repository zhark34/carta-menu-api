var mongoose = require('mongoose');  
var UsuariosSchema  = new mongoose.Schema({  
    usuario: String,
    password: String
});

module.exports = mongoose.model('usuarios', UsuariosSchema);