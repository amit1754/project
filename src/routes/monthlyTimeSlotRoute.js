import express from 'express';
import { monthlyTimeSlotController } from '../controllers';
import data from '../service/cronJob';

const router = express.Router();

router.post(
	'/create',
	// authMiddleware,
	monthlyTimeSlotController.createMonthlyTimeSlot,
);

router.post(
	'/get',
	// authMiddleware,
	monthlyTimeSlotController.getTodayTimeSlot,
);
router.post(
	'/get1',
	// authMiddleware,
	data,
);

module.exports = router;
