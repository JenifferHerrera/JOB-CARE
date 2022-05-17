
const mongoose = require('mongoose');



const PostulacionShema = mongoose.Schema({
    
    postulacion: {
        type: mongoose.Types.ObjectId, ref: 'Ofertas'
       },
   
    fechaReporte: { type: Date, required: true, default: Date.now },
    usuario: {
        type: mongoose.Types.ObjectId, ref: 'Usuario'
       },
   
       ofertante:{
        type: mongoose.Types.ObjectId, ref: 'Usuario'
       },

       estado:String,
       emailOfertante:String,
       urlPdf:String,
       telefono: String,
       nombre:String,

       tituloEmpleo:String,
       remuneracion:String,
       salario:String,
       telefonoEmpleador:String,
       horario:String,
       categoria:String,
       ciudad:String  
})

module.exports = mongoose.model('Postulacion',PostulacionShema); 