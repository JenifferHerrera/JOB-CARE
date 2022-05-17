'use strict'

var express = require('express');

var app = express();


var Usuario = require('../models/usuario');
var Ofertas = require('../models/ofertas')
var Hoja = require('../models/hojavida')
// ==============================
// Busqueda por colección
// ==============================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');   

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;


            case 'ofertas':
                promesa = buscarOfertas(busqueda, regex);
                break;
    
            case 'hojavida':
                promesa = buscarHoja(busqueda, regex);
                break;
      

      

              
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios, proveedores y lista de informes comerciales',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {
          console.log(data)
        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});


// ==============================
// Busqueda general
// ==============================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;

    var regex = new RegExp(busqueda, 'i');   


    Promise.all([
          
           
            buscarUsuarios(busqueda, regex),
            buscarOfertas(busqueda, regex),
            buscarHoja(busqueda, regex),

            buscarOfertasPremium(busqueda, regex),
            buscarHojaPremium(busqueda, regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
              
             
                usuarios: respuestas[1],
                ofertas: respuestas[1],
                hojavida: respuestas[1]
            });
        })


}); 




 
function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'usuario email role img')
            .or([{ 'usuario': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }


            })


    });
}

function buscarOfertas(busqueda, regex) {
    //console.log(busqueda)
    return new Promise((resolve, reject) => {

        Ofertas.find({}, 'tituloEmpleo horario categorias valor ciudad fechaReporte remuneracion ')
            .or([{ 'tituloEmpleo': regex }, { 'horario': regex }, { 'categorias': regex }, { 'ciudad': regex }, { 'rating': regex }])
            .exec((err, ofertas) => {

                if (err) {
                    reject('Error al cargar ofertas', err);
                } else {
                    resolve(ofertas);
                }


            })


    });
}  

function buscarOfertasPremium(busqueda, regex) {
    //console.log(busqueda)
    return new Promise((resolve, reject) => {

        Ofertas.find({tipoPlan: {$ne: 'Free' }}, 'tituloEmpleo horario categorias valor ciudad')
            .or([{ 'tituloEmpleo': regex }, { 'horario': regex }, { 'categorias': regex }, { 'ciudad': regex }])
            .exec((err, ofertas) => {

                if (err) {
                    reject('Error al cargar ofertas', err);
                } else {
                    resolve(ofertas);
                }


            })


    });
}  


function buscarHoja(busqueda, regex) {
console.log(busqueda,'si funciona')
    return new Promise((resolve, reject) => {

        Hoja.find({}, 'nombre apellido descripcion categorias ciudad telefonohoja ocupacion rating').populate('usuario img')
            .or([{ 'nombre': regex }, { 'apellido': regex }, { 'descripcion': regex }, { 'categorias': regex }, { 'ciudad': regex },{ 'rating': regex }])
            .exec((err, hojavida) => {

                if (err) {
                    reject('Erro al cargar perfil', err);
                } else {
                    resolve(hojavida);
                }


            })


    });
}

function buscarHojaPremium(busqueda, regex) {
    console.log(busqueda,'si funciona')
        return new Promise((resolve, reject) => {
    
            Hoja.find({tipoPlan: {$ne: 'Free' }}, 'nombre apellido descripcion categorias ciudad telefonohoja ocupacion').populate('usuario img')
                .or([{ 'nombre': regex }, { 'apellido': regex }, { 'descripcion': regex }, { 'categorias': regex }, { 'ciudad': regex }])
                .exec((err, hojavida) => {
    
                    if (err) {
                        reject('Erro al cargar perfil', err);
                    } else {
                        resolve(hojavida);
                    }
    
    
                })
    
    
        });
    }






module.exports = app;