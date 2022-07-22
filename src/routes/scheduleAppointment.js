import express from 'express';
import { scheduleAppointmentController } from '../controllers';

const router = express.Router();

router.post('/create', scheduleAppointmentController.scheduleAppointment);

module.exports = router;
