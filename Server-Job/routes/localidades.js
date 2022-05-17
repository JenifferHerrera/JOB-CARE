const { Router } = require('express');

const local = require('../controllers/localidades')

const router = Router();

//informe largo
router.post('/',local.crearlocalidad);
router.get('/',local.getLocalidad);

router.put('/:id',local.actualizarLocalidad);
router.delete('/:id',local.eliminarLocalidad);
//archivos



module.exports = router;
