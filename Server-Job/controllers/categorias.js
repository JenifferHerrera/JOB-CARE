var express = require('express');


const Categorias = require('../models/categorias'); 

var app = express();


// POST CREAR CLIENTE
const crearCategoria = (req, res) => {
    // Crear un cliente
    const categorias = new Categorias(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    categorias.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getCategoria = (req, res) => {
    Categorias.find()
        .then(categoria => {
            res.json(categoria);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};




// ACTUALIZAR OPCION
const actualizarLocalidad =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Localidades.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(opcionesGenerales => {
            if (!opcionesGenerales) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params.opcionesGeneralesId
                });
            }
            res.json(opcionesGenerales);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params.opcionesGeneralesId
                });
            }
            return res.status(500).json({
                msg: "Error updating opciones with id " + req.params.opcionesGeneralesId
            });
        });
};

//ELIMINAR OPCION
const eliminarLocalidad = (req, res) => {
    Localidades.findByIdAndRemove(req.params.opcionesGneralesId)
        .then(opcionesGenerales => {
            if (!opcionesGenerales) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params.opcionesGeneralesId
                });
            }
            res.json({ msg: "Opciones deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params.opcionesGeneralesId
                });
            }
            return res.status(500).json({
                msg: "Could not delete opciones with id " + req.params.opcionesGeneralesId
            });
        });
};


module.exports = {

    crearCategoria,
    getCategoria,
    actualizarLocalidad,
    eliminarLocalidad
 
}