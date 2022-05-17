const mongoose = require('mongoose');

const LocalidadSchema = mongoose.Schema({
    provincia:  String,
    cantones:  Array


});

module.exports = mongoose.model('Localidad',LocalidadSchema);