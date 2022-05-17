const mongoose = require('mongoose');

const CategoriasSchema = mongoose.Schema({

    categorias:  String,

})

module.exports = mongoose.model('Categorias',CategoriasSchema);