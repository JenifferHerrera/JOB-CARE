const mongoose = require('mongoose');



const CursosShema = mongoose.Schema({


  
    tituloCurso: String,
    valor:String,
    categorias: String,
    descripcionCurso: String,
    urlPdf:String,
    estado: String,
     fechaReporte: { type: Date, required: true, default: Date.now },
 

});

module.exports = mongoose.model('cursos', CursosShema);