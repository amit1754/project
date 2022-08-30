import express from 'express';
import imageFileController from '../controllers/imageFileController';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post(
	'/createSlider',
	authMiddleware,
	imageFileController.createSliderImages,
);
router.get('/getSlider', imageFileController.getSliderImages);
router.put(
	'/updateSlider',
	authMiddleware,
	imageFileController.updateSliderImages,
);
router.put(
	'/deleteSlider/:id',
	authMiddleware,
	imageFileController.deleteSliderImages,
);

module.exports = router;
