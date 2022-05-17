const { Router } = require('express');

const cate = require('../controllers/categorias')

const router = Router();

//informe largo
router.post('/',cate.crearCategoria);
router.get('/',cate.getCategoria);





module.exports = router;