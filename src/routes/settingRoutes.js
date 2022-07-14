import express, { Router } from 'express';
import { settingController } from '../controllers';
const router = express.Router();

router.post('/Add', settingController.settingManage);
router.delete('/Delete/:id', settingController.deleteByID);

router.put('/Update/:id', settingController.updatekeyId);
router.get('/List',settingController.getSetting);

module.exports = router;
