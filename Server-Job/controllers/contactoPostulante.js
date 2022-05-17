var express = require('express');


const Mail = require('../controllers/mail.controllers');
const Postulacion = require('../models/contactoPostulante');

var app = express();


// POST CREAR CLIENTE
const crearPostulacion =async (req, res) => {
    // Crear un cliente
    try{
        const {  emailPostulante} = req.body;
        const existePlan = await Postulacion.findOne({ emailPostulante });
        if ( existePlan ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya contactaste este perfil'
            });
        
           } 
           const postular = new Postulacion(req.body);
    
        // GUARDAR UNA OPCION EN MongoDB
      await postular.save()
      .then(data => {
          res.json(data);
          Mail.enviarMailContacto(postular)
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
    
   


    // GUARDAR UNA OPCION EN MongoDB

};


// todos las opciones
const getPostulacion1 = (req, res) => {
    Postulacion.find({estado: {$ne: 'NO PUBLICADO' }})
        .then(postulacion => {
            res.json(postulacion);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


const getOfertaPostulacion = (req, res) => {
    Postulacion.find({
        
        usuario:req.query.usuario_id,
      
    
    }).populate('postulacion ').populate(' postulacion.usuario')
        .then(oferta => {
            res.status(201).json(oferta);
        }).catch(err => {
            res.status(500).send({
                msg: err.message,

            });
        });
};


// todos las opciones
const getPostulacion = (req, res) => {
    Postulacion.find()
        .then(postulacion => {
            res.json(postulacion);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdpostulacion =  (req, res) => {
    Postulacion.findById(req.params._id)
        .then(postular => {
            if (!postular) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(postular);
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
const actualizarPostulacion =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Postulacion.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(postular => {
            if (!postular) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(postular);
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
const eliminarPostulacion = (req, res) => {
    Postulacion.findByIdAndDelete(req.params._id)
        .then(postular => {
            if (!postular) {
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

    crearPostulacion,
    getPostulacion,
    getIdpostulacion,
    getOfertaPostulacion, 
    actualizarPostulacion,
    eliminarPostulacion
   
   
 
}