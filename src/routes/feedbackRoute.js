import express from 'express';
import { feedbackController } from '../controllers';
import { customerMiddleware, authMiddleware } from '../middleware';

const router = express.Router();

router.post('/create', customerMiddleware, feedbackController.setFeedback);
router.get('/getFeedback', authMiddleware, feedbackController.getFeedback);
router.put(
	'/updateFeedback/:id',
	authMiddleware,
	feedbackController.updateFeedback,
);
router.put(
	'/deleteFeedback/:id',
	authMiddleware,
	feedbackController.deleteFeedback,
);
module.exports = router;
