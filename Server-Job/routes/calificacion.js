const { Router } = require('express');

const Notification = require('../controllers/calificacion')

const router = Router();

router.post('/',Notification.creaNotification);
router.post('/postulacion',Notification.creaNotificationHoja);
router.get('/',Notification.getNotificationId);

router.get('/post',Notification.getUsuario);
//router.get('/',Notification.getNotificationIdHoja);
//All usuer UPDI
router.get('/updi',Notification.getAllUPDI);
router.put('/',Notification.actualizarNotificationes);
router.delete('/:_id',Notification.eliminarNotification);


module.exports = router;