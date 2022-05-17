
const mongoose = require('mongoose');




'use strict'
const OfertasShema = mongoose.Schema({


 tituloEmpleo: String,
 descripcionEmpleo: String,
 valor:Number,
 horario:String,
 remuneracion: String,
 direccion:String,
 estado: String,
 tipoPlan: String,
 categorias: String,
 telefonoEmpleador:String,
 provincia: {   type: String },
 emailEmpleador:String,
 ciudad: { type: String },
 fechaReporte: { type: Date, required: true, default: Date.now },
 usuario: {
     type: mongoose.Types.ObjectId, ref: 'Usuario'
    },


   postulacion:[
      { 
         
         user:{type:mongoose.Types.ObjectId, ref: 'Usuario' },
         descripcion:{type:mongoose.Types.ObjectId, ref: 'hojavida'} , 
         estatus: String
      }
   
   ]

});



module.exports = mongoose.model('Ofertas', OfertasShema);