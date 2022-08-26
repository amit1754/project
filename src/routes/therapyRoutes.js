import express from 'express';
import { therapyController } from '../controllers';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.get('/get', therapyController.getTherapy);
router.post('/create', authMiddleware, therapyController.addTherapy);
router.put('/update/:id', authMiddleware, therapyController.updateTherapy);
router.delete('/delete/:id', authMiddleware, therapyController.deleteTherapy);

module.exports = router;
