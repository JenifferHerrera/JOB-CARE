
const mongoose = require('mongoose');

const CalificacionSchema = mongoose.Schema({

    title:String,
    view:Boolean,
    usuario:{
        type: mongoose.Types.ObjectId, 
        ref: 'Usuario',
        require: true
    },
    fechaReporte: { type: Date, required: true, default: Date.now},
    uri: String,
    role: String,
    detalle: String,
    trasmitter: {
        type: mongoose.Types.ObjectId, 
        ref: 'Usuario',
        require: true
    },
    receiver: {
        type: mongoose.Types.ObjectId, 
        ref: 'Usuario',
        require: true
    },
    receiverHoja:{
        type: mongoose.Types.ObjectId, 
        ref: 'hojavida',
       // require: true
    },
    receiverOferta:{
        type: mongoose.Types.ObjectId, 
        ref: 'Ofertas',
       // require: true
    },

    urlPdfHoja: String,
    emailOfertante:String,
    nombreEmpleado: String,
    telefonohoja: String,
    emailHoja: String,
    telefonoEmpleador:String
})

module.exports = mongoose.model('Calificacion', CalificacionSchema);