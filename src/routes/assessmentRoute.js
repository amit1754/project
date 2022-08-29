import express from 'express';
import { assessmentController } from '../controllers';
import { authMiddleware } from '../middleware';
const router = express.Router();

router.post('/create', assessmentController.setAssessment);
router.get(
	'/getAssessment',
	authMiddleware,
	assessmentController.getAssessment,
);

module.exports = router;
