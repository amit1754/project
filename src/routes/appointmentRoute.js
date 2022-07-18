import express from 'express';
import { appointmentController } from '../controllers';
import { customerMiddleware } from '../middleware';
const router = express.Router();

router.post(
	'/create',
	customerMiddleware,
	appointmentController.createAppointment,
);

module.exports = router;
