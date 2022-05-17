var express = require('express');


const Localidades = require('../models/localidad');

var app = express();


// POST CREAR CLIENTE
const crearlocalidad = (req, res) => {
    // Crear un cliente
    const opcionesGenerales = new Localidades(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    opcionesGenerales.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getLocalidad = (req, res) => {
    Localidades.find()
        .then(opcionesGenerales => {
            res.json(opcionesGenerales);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getidLocalidad =  (req, res) => {
    Localidades.findById(req.params.opcionesGeneralesId)
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
                    msg: "Opciones not found with id " + req.params.opcionesgeneralesId
                });
            }
            return res.status(500).json({
                msg: "Error retrieving Opciones with id " + req.params.opcionesGeneralesId
            });
        });
};

// ACTUALIZAR OPCION
const actualizarLocalidad=  (req, res) => {
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

    crearlocalidad,
    getLocalidad,
    actualizarLocalidad,
    eliminarLocalidad
 
}