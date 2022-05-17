const { Router } = require('express');

const Cursi = require('../controllers/cursosComprados')

const router = Router();

//informe largo
router.post('/',Cursi.crearCurso);
router.get('/',Cursi.getCursosUsuario);
router.get('/todos',Cursi.getCursos);
router.get('/:_id',Cursi.getIdCurso);
router.put('/',Cursi.actualizarCurso);
router.delete('/:_id',Cursi.eliminarCurso);




module.exports = router;