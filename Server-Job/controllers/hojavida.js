var express = require('express');

const Mail = require('../controllers/mail.controllers');
const Hojavida = require('../models/hojavida');

var app = express();


// POST CREAR CLIENTE
const crearHoja = (req, res) => {
    // Crear un cliente
    const hoja = new Hojavida(req.body);

    // GUARDAR UNA OPCION EN MongoDB
   hoja.save()
        .then(data => {
            res.json(data);
            Mail.enviarMailHoja(hoja)
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};

const postInsert  =async (req, res) => {
  
  
  
    if (req.body._id) {

        let userExist = await Hojavida.findOne({_id: req.body._id,postulacion:{$elemMatch:{user:req.body.user}}});
        if(userExist){
           return res.json({
               success: false,
               msj: 'El usuario ya se ha postulado a la oferta'
           });
        }
        Hojavida.updateOne({ _id: req.body._id }, {
            
                $push: {
                 'postulacion': {     
                        user: req.body.user,
                        //descripcion: req.body.descripcion
                    }
                }
            },
           (error) => {
                if (error) {
                    return res.json({
                        success: false,
                        msj: 'No se pudo agregar el Postulacion',
                        err
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'Se agregó correctamente la Postulacion'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar la postulacion, por favor verifique que el _id sea correcto'
        });
    }

};


// todos las opciones
const getHoja = (req, res) => {
    Hojavida.find({estado: {$ne: 'NO PUBLICADO' }}).populate('usuario img')
        .then(hoja => {
            res.json(hoja);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};

const getHojaPremium = (req, res) => {
    Hojavida.find({estado: {$ne: 'NO PUBLICADO' },tipoPlan: {$ne: 'Free' }}).populate('usuario')
        .then(hoja=> {
            res.json(hoja);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getHojavida = (req, res) => {
    Hojavida.find({usuario:req.query.usuario_id})

    .populate(' postulacion.user ')
        .then(hoja => {
            res.json(hoja);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdHoja =  (req, res) => {
    Hojavida.findById(req.params._id)
        .then(hoja => {
            if (!hoja) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(hoja);
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
const actualizarHoja =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Hojavida.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(hoja => {
            if (!hoja) {
                return res.status(404).json({
                    msg: "id indefinido " + req.params._id
                });
            }
            res.json(hoja);
            Mail.enviarMailHojaPublica(hoja)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "id indefinido " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error al actualizar las opciones con id" + req.params._id
            });
        });
};






//ELIMINAR OPCION
const eliminarHoja = (req, res) => {
    Hojavida.findByIdAndDelete(req.params._id)
        .then(hoja => {
            if (!hoja) {
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
    postInsert,
    crearHoja,
    getHoja,
    getHojaPremium,
    getIdHoja,
    getHojavida,
    actualizarHoja,
    eliminarHoja,
   
 
}