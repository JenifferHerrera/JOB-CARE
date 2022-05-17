const mongoose = require('mongoose');



const CursosCompradosShema = mongoose.Schema({


  
    tituloCurso: String,
    valor:String,
    categorias: String,
    descripcionCurso: String,

    estado: String,
     fechaReporte: { type: Date, required: true, default: Date.now },
     usuario: {
        type: mongoose.Types.ObjectId, ref: 'Usuario'
       },

       emailusuario:String,
       telefono: String
});

module.exports = mongoose.model('cursosComprados', CursosCompradosShema);