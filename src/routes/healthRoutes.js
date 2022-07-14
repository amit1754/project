import express from 'express';
import upload from '../utils/fileUpload';
import { healthController } from '../controllers';

const router = express.Router();

router.post('/create', upload.single('profileImage'), healthController.create);

module.exports = router;
