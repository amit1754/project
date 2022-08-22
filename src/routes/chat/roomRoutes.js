import express from 'express';
import { chatRoomController } from '../../controllers';

const router = express.Router();

router.post('/create', chatRoomController.createRoom);
router.post('/sendMessage', chatRoomController.sendMessage);

module.exports = router;
