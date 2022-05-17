const { Router } = require('express');

const Postulando = require('../controllers/contactoPostulante')

const router = Router();

//informe largo
router.post('/',Postulando.crearPostulacion);
router.get('/',Postulando.getOfertaPostulacion);
router.get('/',Postulando.getPostulacion);
//router.put('/',ofertasEmpleo.actualizarOferta);
router.delete('/:_id',Postulando.eliminarPostulacion);
//archivos



module.exports = router;