const mongoose = require('mongoose');
const {Schema} = mongoose;

const MensajeSchema = new Schema({
    oferta: {type: mongoose.Types.ObjectId, ref: 'Ofertas'},
    usuario: {type: mongoose.Types.ObjectId, ref: 'Usuario'},
    mensaje: {type: String},
    tipoUsuario: {type: String},
    fecha: {type: Date},
    estado: {type: String},
});


const Mensaje = mongoose.model('Mensaje', MensajeSchema);

module.exports = Mensaje;
