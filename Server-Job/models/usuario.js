
const mongoose = require('mongoose');


var rolesValidos = {
   values: ['ADMIN_ROLE', 'USER_ROLE', 'EMPLEADOR_ROLE', 'EMPLEADO_ROLE', 'INACTIVO', 'CAPACITATE_ROLE'],
   message: '{VALUE} no es un rol permitido'
};


const UsuarioSchema = mongoose.Schema({

 
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true, },
   usuario: { type: String },
   img: { type: String },
   role: {
      type: String,
      // required: true,
      //  default: 'USER_ROLE',
      enum: rolesValidos
   },

   ninos: { type: Array },


   telefono: { type: String },

   clave: { type: String },

   provincia: { type: String },

   ciudad: { type: String },
   direccion: { type: String },

   direccionmapa: { type: String },

   lavado: { type: Boolean },
   comida: { type: Boolean },

   limpieza: { type: Boolean },
   tareas: { type: Boolean },

   fecha: { type: String },

   experiencia: { type: String },

   tipoPlan: { type: String },
   categorias: { type: String },

   adulto: { type: Array },


   compania: {

      type: Boolean
   },
   alimentacion: {

      type: Boolean
   },
   actividades: {

      type: Boolean
   },
   paseo: {

      type: Boolean
   },


   perros: {

      type: Boolean
   },
   gatos: {

      type: Boolean
   },
   otros: {

      type: Boolean
   },


   peluqueria: {

      type: Boolean
   },
   masajes: {

      type: Boolean
   },
   manicure: {

      type: Boolean
   },
   pedicura: {

      type: Boolean
   },
   maquillaje: {

      type: Boolean
   },


   bebe: {

      type: Boolean
   },

   infante: {

      type: Boolean
   },

   adolescente: {

      type: Boolean
   },


   adultocheck: {

      type: Boolean
   },

   adultoMayor: {

      type: Boolean
   },

   descripcion: {

      type: String
   },

   prekinder: {

      type: Boolean
   },

   kinder: {

      type: Boolean
   },
   escuela: {

      type: Boolean
   },
   colegio: {

      type: Boolean
   },


   albanil: {

      type: Boolean
   },

   electricista: {

      type: Boolean
   },

   plomero: {

      type: Boolean
   },

   carpintero: {

      type: Boolean
   },

   cerrajero: {

      type: Boolean
   },

   jardinero: {

      type: Boolean
   },

   servicioTecnico: {

      type: Boolean
   },



   grua: {

      type: Boolean
   },

   mecanico: {

      type: Boolean
   },
   electrico: {

      type: Boolean
   },
   lavadoAuto: {

      type: Boolean
   },
   chofer: {

      type: Boolean
   },
   cerrajeroAutomotriz: {

      type: Boolean
   },



   paqueteria: {

      type: Boolean
   },
   tramites: {

      type: Boolean
   },
   movilizacion: {

      type: Boolean
   },

   dentroCiudad: {

      type: Boolean
   },

   otrasCiudades: {

      type: Boolean
   },

   fueraPais: {

      type: Boolean
   },


   facebook: {

      type: Boolean
   },
   twitter: {

      type: Boolean
   },
   instagram: {

      type: Boolean
   },
   linkedin: {

      type: Boolean
   },
});


/* UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})  */



module.exports = mongoose.model('Usuario', UsuarioSchema);
