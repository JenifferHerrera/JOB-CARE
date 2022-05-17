var express = require('express');

const Mail = require('../controllers/mail.controllers');
const Mensaje = require('../models/mensaje');
const Ofertas = require('../models/ofertas');




// POST CREAR CLIENTE
const crearOferta = (req, res) => {
    // Crear un cliente
    const ofertas = new Ofertas(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    ofertas.save()
        .then(data => {
            res.json(data);

            Mail.enviarMailOferta(ofertas)
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};




const postInsert  =  async (req, res) => {
  if (req.body._id) {
   
let userExist = await Ofertas.findOne({_id: req.body._id,postulacion:{$elemMatch:{user:req.body.user}}});
 if(userExist){
    return res.json({
        success: false,
        msj: 'El usuario ya se ha postulado a la oferta'
    });
 }  
            Ofertas.updateOne({ _id: req.body._id }, {
                
                $push: {
                     'postulacion': {     
                            user: req.body.user,
                            descripcion: req.body.descripcion,
                            estatus: req.body.estatus
                        }
                    }

                
                },
               (error) => {
                    if (error) {
                        return res.json({
                            success: false,
                            msj: 'No se pudo agregar la Postulacion',
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
const getOfertas = (req, res) => {

    const sort = { fechaReporte: -1 };
    Ofertas.find({estado: {$ne: 'NO PUBLICADO' }}).sort(sort).populate('usuario')
        .then(oferta => {
            res.json(oferta);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};
const getOfertasPremium = (req, res) => {
    const sort = { fechaReporte: -1 };
    Ofertas.find({estado: {$ne: 'NO PUBLICADO' },tipoPlan: {$ne: 'Free' }}).sort(sort).populate('usuario')
        .then(oferta => {
            res.json(oferta);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getOferta = (req, res) => {
    Ofertas.find({
        
        usuario:req.query.usuario_id,
      
    
    }).populate(' postulacion.user postulacion.descripcion usuario ')
        .then(oferta => {
            res.status(201).json(oferta);
        }).catch(err => {
            res.status(500).send({
                msg: err.message,

            });
        });
};


//ENCUENTRE UNA OPCION
const getIdOferta =  (req, res) => {
    Ofertas.findById(req.params._id).populate('usuario')
        .then(ofertas => {
            if (!ofertas) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(ofertas);
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
const actualizarOferta =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Ofertas.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(ofertas => {
            if (!ofertas) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                }); 
            }
            res.json(ofertas);
            Mail.enviarMailPublica(ofertas)
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
const eliminarOferta = (req, res) => {
    Ofertas.findByIdAndDelete(req.params._id)
        .then(ofertas => {
            if (!ofertas) {
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

//============================ofertas mensajes ===================================
const registrarMensaje = async (req, res) => {
    const mensajeData = req.body.mensaje;


    const mensaje = new Mensaje({
        usuario: mensajeData.usuario._id,
        oferta: mensajeData.oferta._id,
        mensaje: mensajeData.mensaje,
        tipoUsuario: mensajeData.tipoUsuario,
        fecha: new Date(),
        estado: 'CREADO',
    });
    await mensaje.save();
    const resultMensajesAdministrador = await Mensaje.find({
        oferta: mensajeData.oferta._id,
        tipoUsuario: 'ADMINISTRADOR'
    });
    if (resultMensajesAdministrador.length === 1) {
        const oferta = await Ofertas.findOne({_id: mensajeData.oferta._id});
        oferta.estado = 'EN_PROCESO_PRELIQUIDACION';
        oferta.save();
    }
    const resultMensajes = await Mensaje.find({oferta: mensajeData.oferta._id});
    res.status(201).json({
        code: 'ui-2',
        error: 'creado',
        data: resultMensajes
    });

}
const obtenerMensajes = async (req, res) => {
    // try {
    const idOferta = req.query.idOferta;
    const oferta = await Ofertas.findOne({_id: idOferta});
    if (idOferta == null || idOferta == '' || idOferta == 'null') {
        res.status(404).json({
            code: 'ui-6',
            messageError: 'no existe la oferta',
            data: null
        });
    } else {
        const mensajes = await Mensaje.find({oferta: idOferta, estado: {$ne: 'ELIMINADO'}});
        if (mensajes.length == 0) {
            res.status(404).json({
                code: 'ui-6',
                message: '',
                data: null
            });
        } else {
            res.status(200).json({
                code: 'ui-6',
                messageError: '',
                data: {'mensajes': mensajes}
            });
        }
    }
   
}


module.exports = {
  //  crearOfertaId,
  postInsert,
    crearOferta,
    getOferta,
    getIdOferta,
    getOfertas,
    actualizarOferta,
    eliminarOferta,
   
    registrarMensaje,
    obtenerMensajes,
    getOfertasPremium
}