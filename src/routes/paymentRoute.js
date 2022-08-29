import express from 'express';
import { paymentController } from '../controllers';
import { customerMiddleware } from '../middleware';

const router = express.Router();

router.post('/create', customerMiddleware, paymentController.addPayment);
router.post('/failedPayment', paymentController.failedPayment);
router.get('/getPayment', paymentController.getPayment);

module.exports = router;
