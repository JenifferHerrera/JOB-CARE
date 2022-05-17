const Notification = require('../models/calificacion');
const Usuario = require('../models/usuario');
const Mail = require('../controllers/mail.controllers');

// POST CREAR notification
const creaNotification = async (req, res) => {
    // Crear un notification


    try {
         
     /*    const { uri} = req.body;
        const existePlan = await Notification.findOne({ uri});
        if ( existePlan ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya esta Postulado a esta Oferta',
                msj:'POSTULADO'
            });
        
           }  */

 const notification = new Notification(req.body);

        // GUARDAR UNA OPCION EN MongoDB
    await notification.save()
            .then(data => {
                res.json(data);
                Mail.enviarMailContacto(notification)
               // Mail.enviarMailPostulacion(notification) 
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


const creaNotificationHoja = async (req, res) => {
    // Crear un notification


    try {
         //revisar
    /*     const { usuario} = req.body;
        const existePlan = await Notification.findOne({ usuario});
        if ( existePlan ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya esta Postulado a esta Oferta',
                msj:'POSTULADO'
            });
        
           }  */

 const notification = new Notification(req.body);

        // GUARDAR UNA OPCION EN MongoDB
    await notification.save()
            .then(data => {
                res.json(data);

                Mail.enviarMailPostulacion(notification) 
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
// todos las opciones x user
const getNotificationId = async(req, res) => {
    const desde = Number(req.query.desde) || 0;

    try {
        const [ notifications, total ] = await Promise.all([
            Notification
                .find({ "receiver" : req.query.user_id })
                .populate('receiver').populate('trasmitter').populate('receiverHoja').populate('receiverOferta')
                .sort({ fechaReporte: -1 }).skip(desde).limit(10),
            Notification.find({ "receiver" : req.query.user_id }).countDocuments()
        ])
        
        res.json({
            data: notifications,
            total: total,
            desde: desde+notifications.length,
            ok: true
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            msg: "Error inesperado"
        });   
    }
};

const getNotificationIdHoja = async(req, res) => {
    const desde = Number(req.query.desde) || 0;

    try {
        const [ notifications, total ] = await Promise.all([
            Notification
                .find({ "receiverHoja" : req.query.user_id }).populate('receiverHoja')
                .populate('receiver').populate('trasmitter')
                .sort({ fechaReporte: -1 }).skip(desde).limit(10),
            Notification.find({ "receiver" : req.query.user_id }).countDocuments()
        ])
        
        res.json({
            data: notifications,
            total: total,
            desde: desde+notifications.length,
            ok: true
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            msg: "Error inesperado"
        });   
    }
};


const getUsuario = (req, res) => {
    Notification.find({usuario:req.query.usuario_id}).populate('receiverHoja').populate('receiverOferta')
    .populate('receiver').populate('trasmitter')

  
        .then(noti => {
            res.json(noti);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};
// get all UDPI
const getAllUPDI = (req, res) => {
    Usuario.find({ "role" : req.query.role },{ _id: 1, role: 1, email: 1, nombre: 1 })
        .then(usuario => {
            res.json({
                data: usuario,
                msg: 'Ok'
            });
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};

// ACTUALIZAR OPCION
const actualizarNotificationes = (req, res) => {
    //Encuentra un notification y actualízalo
    Notification.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(notification => {
            if (!notification) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(notification);
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
const eliminarNotification = (req, res) => {
    Notification.findByIdAndDelete(req.params._id)
        .then(notification => {
            if (!notification) {
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

    creaNotification,
    creaNotificationHoja,
    getNotificationId,
    getNotificationIdHoja,
    getUsuario,
    getAllUPDI,
    actualizarNotificationes,
    eliminarNotification

}