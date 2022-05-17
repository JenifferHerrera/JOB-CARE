const { Router } = require('express');

const ofertasEmpleo = require('../controllers/ofertas')

const router = Router();

//informe largo
router.post('/crear',ofertasEmpleo.crearOferta);
router.post('/insertar',ofertasEmpleo.postInsert);    
router.get('/',ofertasEmpleo.getOferta);
router.get('/todos',ofertasEmpleo.getOfertas);

router.get('/premium',ofertasEmpleo.getOfertasPremium);
router.get('/:_id',ofertasEmpleo.getIdOferta);
router.put('/',ofertasEmpleo.actualizarOferta);

router.put('/:_id',ofertasEmpleo.actualizarOferta);
router.delete('/:_id',ofertasEmpleo.eliminarOferta);
//archivos
router.post('/enviar/mensajes', ofertasEmpleo.registrarMensaje);
router.get('/traer/mensajes', ofertasEmpleo.obtenerMensajes);


module.exports = router;
