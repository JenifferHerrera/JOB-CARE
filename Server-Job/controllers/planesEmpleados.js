var express = require('express');


const Planes = require('../models/planesEmpleados');

var app = express();


// POST CREAR CLIENTE
const crearPlan = async (req, res) => {
    // Crear un cliente
 try{
    const {  usuario } = req.body;
    const existePlan = await Planes.findOne({ usuario });
    if ( existePlan ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya esta suscrito a un Plan '
        });
    
       }
    const planes = new Planes(req.body);

    // GUARDAR UNA OPCION EN MongoDB
  await  planes.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
 } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error inesperado... revisar logs'
    });
}

};


const PlanesPagos = async (req, res) => {
    try{
        const {  tipoPlan} = req.body;
        const existePlan = await Planes.findOne({ tipoPlan });
        if ( existePlan ) {
            return res.status(400).json({
                ok: false,
                msg:tipoPlan
            });
        
           }
        const planes = new Planes(req.body);
    
        // GUARDAR UNA OPCION EN MongoDB
      await  planes.save()
            .then(data => {
                res.json(data);
            }).catch(err => {
                res.status(500).json({
                    msg: err.message
                });
            });
     }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}   

// todos las opciones
const getPlan = (req, res) => {
    Planes.find({usuario:req.query.usuario_id})
        .then(plan => {
            res.json(plan);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};

const getPlanes = (req, res) => {
    Planes.find().populate('usuario')
        .then(plan => {
            res.json(plan);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};

// ACTUALIZAR OPCION
const actualizarPlan =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Planes.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(plan => {
            if (!plan) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(plan);
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



module.exports = {
    crearPlan,
    PlanesPagos,
    getPlan,
    getPlanes,
    actualizarPlan
}