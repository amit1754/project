import express, { Router } from 'express';
import { get } from 'lodash';
import { userController } from '../controllers';
import { authMiddleware } from '../middleware';
const router = express.Router();

router.post('/create', userController.createUser);
router.get('/get', userController.getAllUser);
router.get('/get/:id', userController.getById);
router.delete('/delete/:id', userController.deleteData);
router.put('/update/:id', userController.updateData);

module.exports = router;
