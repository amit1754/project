import express from 'express';
import imageFileController from '../controllers/imageFileController';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post('/createSlider', imageFileController.createSliderImages);
router.get('/getSlider', imageFileController.getSliderImages);
router.put('/updateSlider', imageFileController.updateSliderImages);

module.exports = router;
