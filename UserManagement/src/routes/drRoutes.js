import express from 'express';
import { validator } from '../validation';
import { drController } from '../controllers';
const router = express.Router();
router.post('/create', validator.drCreateValidator, drController.createDr);
router.post('/verify-otp', validator.VerifyDrValidator, drController.verifyOtp);
router.post('/update', drController.updateProfile);
router.post('/delete/:id', drController.deleteDr);
router.post('/login', drController.loginDr);

module.exports = router;
