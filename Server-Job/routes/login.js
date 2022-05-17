var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/usuario');

var mdAutentication = require('../middlewares/autenticacion')


app.get('/renuevatoken', mdAutentication.verificaToken,(req,res) =>{

    var token =jwt.sign({ usuario: req.usuario}, SEDD,{expiresIn:115200});//24 horas

    res.status(200).json({
   
        ok: true,
        token:token   


    });

});

  

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false, 
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear un token!!!
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 115200 }); // 24 horas
     
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id,
                menu: obtenerMenu(usuarioDB.role)
            });  
        
      

    })


});


function obtenerMenu(ROLE) {

   var menu = [
        {
        /*  titulo: 'Principal',
         icono: 'mdi mdi-gauge', */
         submenu: [ ],
         },

    

        /*{
            titulo: 'Proveedores',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
              
            ],
        }, 

        {
            titulo: 'Informes',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
              
            ],
        }, 
     */
   
    
     ]

   console.log('ROLE', ROLE);

    if (ROLE === 'ADMIN_ROLE') {
        menu[0].submenu.unshift(  
            { titulo : 'Usuarios', url: '/dashboard/administrador' }, 
            { titulo: 'Crear cursos', url: '/dashboard/crearCurso' },
            { titulo : 'Ver cursos', url: '/dashboard/verCurso' },
            { titulo : 'Cursos Comprados', url: '/dashboard/cursosCompradosT' },
            { titulo: 'Perfiles publicados ', url: '/dashboard/perfilesAdmin' },
            { titulo : 'Ofertas publicadas', url: '/dashboard/ofertasAdmin' },

            { titulo : 'Empleadores Premium', url: '/dashboard/suscripcionesEmpleadores' },
            { titulo : 'Empleados Premium', url: '/dashboard/suscripcionesEmpleados' },
       
     //   { titulo: 'Administrar usuarios', url: '/usuarios' },
     //   { titulo : 'Administrador de tareas', url: '/adminTareas' },
      

     
    );
  

    } 
    if (ROLE === 'USER_ROLE') {
        menu[0].submenu.unshift( 
          
       //     { titulo : 'Formulario de Inscripción', url: '/dashboard/admininico' }, 
         //   { titulo: 'Editor de oferta de empleo', url: '/dashboard/verofertas' },
        //    { titulo: 'Planes', url: '/dashboard/planes' }, 
     //   { titulo : 'Crear usuarios', url: '/Registrar' },
     //   { titulo: 'Administrar usuarios', url: '/usuarios' },
     //   { titulo : 'Administrador de tareas', url: '/adminTareas' },
      );
  

    }   
    
    if (ROLE === 'EMPLEADOR_ROLE') {
        menu[0].submenu.unshift(  
           
            { titulo : 'Publicar Oferta', url: '/dashboard/admininico' }, 
            { titulo: 'Ver ofertas publicadas', url: '/dashboard/verofertas' },
            { titulo: 'Postulaciones', url: '/dashboard/postulacionOfertas' },
            { titulo: 'Mis Suscripciones', url: '/dashboard/planes' },
            { titulo: 'Perfiles Empleados', url: '/dashboard/perfiles' },
            { titulo: 'Perfiles Contactados', url: '/dashboard/postulantesContactados' },
            { titulo: 'Cursos', url: '/dashboard/cursosEmpleadores' },
            { titulo : 'Cursos Comprados', url: '/dashboard/cursosCompradosEmpleador' }
        );
      
    }

    if (ROLE === 'EMPLEADO_ROLE') {
        menu[0].submenu.unshift(  
        { titulo : 'Hoja de Vida', url: '/dashboard/hojavida' }, 
        { titulo : 'Editar Hoja de vida', url: '/dashboard/verhoja' },
        { titulo : 'Mis Suscripciones', url: '/dashboard/planes/empleados' },
        { titulo : 'Aplicar a una oferta', url: '/dashboard/ofertasPublicadas' },
        { titulo : 'Mis Postulaciones', url: '/dashboard/ofertasPostuladas' },
        { titulo : 'Empleador solicitando', url: '/dashboard/teContactaron' },
        { titulo : 'Cursos', url: '/dashboard/cursosEmpleados' },
        { titulo : 'Cursos Comprados', url: '/dashboard/cursosComprados' }
      //  { titulo : 'Actualizar Los requisitos/Descargar Certificado', url: '/historial' } 
        
        );
      
    }


    if (ROLE === 'PROFESIONAL_ROLE') {
        menu[0].submenu.unshift(  
        { titulo : 'Hoja de Vida', url: '/dashboard/hojavidaprofesional' }, 
        { titulo : 'Editar Hoja de vida', url: '/dashboard/verhojaProfesional' },
        { titulo : 'Mis Suscripciones', url: '/dashboard/planes/empleados' },
        { titulo : 'Ofertas', url: '/dashboard/ofertasPublicadas' },
        { titulo : 'Mis Postulaciones', url: '/dashboard/ofertasPostuladas' },
        { titulo : 'Empleador solicitando', url: '/dashboard/teContactaron' },
        { titulo : 'Cursos', url: '/dashboard/cursosEmpleados' },
      //  { titulo : 'Actualizar Los requisitos/Descargar Certificado', url: '/historial' } 
        
        );
      
    }

    
    if (ROLE === 'CAPACITATE_ROLE') {
        menu[0].submenu.unshift(  
            { titulo : 'Cursos', url: '/dashboard/cursosCompra' }, 
            { titulo : 'Cursos comprados', url: '/dashboard/cursosComprad' }, 
        
        );
      
    }



    return menu;

} 
  
   
     

 
module.exports = app;