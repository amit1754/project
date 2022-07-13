import express, { Router } from 'express';
import { settingController } from '../controllers';
const router = express.Router();

router.post('/Setting', settingController.settingManage);
router.delete('/SettingDelete/:id', settingController.deleteByID);

router.get('/getall', settingController.getRequest);
router.put('/update/:id', settingController.updateByid);

module.exports = router;
