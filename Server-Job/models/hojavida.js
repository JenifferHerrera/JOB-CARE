const mongoose = require('mongoose');



const HojavidaShema = mongoose.Schema({


    nombre: String,
    apellido: String,
    cedula: String,
    refSalarial: String,
    fechaNacimiento: Date,
    edad: String,
    genero:String,
    ocupacion: String,
    descripcion: String,
    categorias: String,
    provincia:String,
    ciudad: String,
    direccion: String,
    direccionMapa: String,
    experiencia:String,
    descripcionExperiencia: String,
    nivelEducacion: String,
    rating: String,
    estado: String,
    check: Boolean,
    img2: String,
//referencia 1
    nombreRef1:String,
    cargoRef1: String,
    empresaRef1:String,
    telefonoRef1:String,

    //referencia 2
    nombreRef2:String,
    cargoRef2: String,
    empresaRef2:String,
    telefonoRef2:String,
    //referencia 3
    nombreRef3:String,
    cargoRef3: String,
    empresaRef3:String,
    telefonoRef3:String,
    emailHoja:String,
    telefonohoja:String, 
     fechaReporte: { type: Date, required: true, default: Date.now },
     usuario: {
     type: mongoose.Types.ObjectId, ref: 'Usuario'
    },

    postulacion:[
        {  user:{type:mongoose.Types.ObjectId, ref: 'Usuario'},
         //  descripcion:{type:mongoose.Types.ObjectId, ref: 'hojavida'}  
     
         } 
        ],
        tipoplan:String,
        urlPdf:String,


        cambioCiudad:String,
        dispoViaje:String,
        idioma:String,
        nivelIdioma:String,
        estatus: String,
        comentario: String
});

module.exports = mongoose.model('hojavida', HojavidaShema);