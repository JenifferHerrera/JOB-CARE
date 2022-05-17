
const mongoose = require('mongoose');



const ContactoShema = mongoose.Schema({
    
    postulacion: {
        type: mongoose.Types.ObjectId, ref: 'hojavida'
       },
   
    fechaReporte: { type: Date, required: true, default: Date.now },
    usuario: {
        type: mongoose.Types.ObjectId, ref: 'Usuario'
       },
   
       ofertante:{
        type: mongoose.Types.ObjectId, ref: 'Usuario'
       },

       emailPostulante:String,
       nombre:String,
       telefono:String,
       emailEmpleador:String,
       telefonoPostulante:String,
       nombrePostulante:String,
    apellidoPostulante:String,
    categoriaPostulante:String,
    cedulaPostulante:String,
    ciudadPostulante:String,
    direccionPostulante:String,
    urlPdf:String
})

module.exports = mongoose.model('Contacto',ContactoShema); 