import express from 'express';
import { scheduleAppointmentController } from '../controllers';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post('/create', scheduleAppointmentController.scheduleAppointment);
router.post('/get', scheduleAppointmentController.getScheduleAppointment);
router.put(
	'/re-schedule/:id',
	scheduleAppointmentController.setReScheduleAppointment,
);

module.exports = router;
