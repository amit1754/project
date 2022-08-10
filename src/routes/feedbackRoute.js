import express from 'express';
import { feedbackController } from '../controllers';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post('/create', feedbackController.setFeedback);
router.get('/getFeedback', feedbackController.getFeedback);
router.put('/updateFeedback/:id', feedbackController.updateFeedback);
router.put(
	'/deleteFeedback/:id',
	authMiddleware,
	feedbackController.deleteFeedback,
);

module.exports = router;
