import express from 'express';
import { notificationController } from '../controllers';
import { customerMiddleware } from '../middleware';

const router = express.Router();

router.get(
	'/getCurrentUser',
	customerMiddleware,
	notificationController.getCustomerNotification,
);

module.exports = router;
