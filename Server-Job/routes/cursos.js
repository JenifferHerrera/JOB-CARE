const { Router } = require('express');

const Cursi = require('../controllers/cursos')

const router = Router();

//informe largo
router.post('/',Cursi.crearCurso);
router.get('/',Cursi.getCursos);
router.get('/:_id',Cursi.getIdCurso);
router.put('/',Cursi.actualizarCurso);
router.delete('/:_id',Cursi.eliminarCurso);




module.exports = router;