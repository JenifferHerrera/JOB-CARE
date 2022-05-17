const { Router } = require('express');

const Planes = require('../controllers/planes')

const router = Router();

//informe largo
router.post('/',Planes.crearPlan);
//router.post('/',Planes.PlanesPagos);
//router.get('/',ofertasEmpleo.getOferta);
router.get('/todos',Planes.getPlanes);
router.get('/',Planes.getPlan);
router.put('/',Planes.actualizarPlan);
//router.delete('/:_id',ofertasEmpleo.eliminarOferta);
//archivos



module.exports = router;