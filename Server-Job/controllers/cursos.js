var express = require('express');


const Cursos = require('../models/cursos');

var app = express();


// POST CREAR CLIENTE
const crearCurso = (req, res) => {
    // Crear un cliente
    const curso = new Cursos(req.body);

    // GUARDAR UNA OPCION EN MongoDB
   curso.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getCurso = (req, res) => {
    Cursos.find({estado: {$ne: 'NO PUBLICADO' }})
        .then(curso => {
            res.json(curso);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getCursos = (req, res) => {
    Cursos.find()
        .then(curso => {
            res.json(curso);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdCurso =  (req, res) => {
    Cursos.findById(req.params._id)
        .then(curso => {
            if (!curso) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(curso);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error retrieving Opciones with id " + req.params._id
            });
        });
};

// ACTUALIZAR OPCION
const actualizarCurso =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Cursos.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(curso => {
            if (!curso) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(curso);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error updating opciones with id " + req.params._id
            });
        });
};






//ELIMINAR OPCION
const eliminarCurso = (req, res) => {
    Cursos.findByIdAndDelete(req.params._id)
        .then(curso => {
            if (!curso) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json({ msg: "Opciones deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Could not delete opciones with id " + req.params._id
            });
        });
};


module.exports = {

    crearCurso,
    getCurso,
    getIdCurso,
    getCursos,
    actualizarCurso,
    eliminarCurso,
   
 
}