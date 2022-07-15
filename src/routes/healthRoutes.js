import express from 'express';
import upload from '../utils/fileUpload';
import { healthController } from '../controllers';

const router = express.Router();

router.post('/create', upload.single('profileImage'), healthController.create);
router.delete('/delete/:id', healthController.deleteByID);
router.get('/get', healthController.getData);
router.put('/update/:id', upload.single('profileImage'), healthController.updateByid);

module.exports = router;
