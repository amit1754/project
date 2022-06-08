import express from 'express';
import { notificationTypeController } from '../controllers';
import { authMiddleware } from '../middleware';
import { validator } from '../validation';
const router = express.Router();

router.post(
	'/create',
	validator.notificationTypeCreate,
	notificationTypeController.createNotificationType,
);
router.put('/update/:id', notificationTypeController.updateNotificationType);
router.get('/list', notificationTypeController.listAllNotificationType);
router.delete('/delete/:id', notificationTypeController.deleteNotificationType);

module.exports = router;
