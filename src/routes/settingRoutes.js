import express from 'express';
import { settingController } from '../controllers';
import { authMiddleware } from '../middleware';
const router = express.Router();

router.post('/add', authMiddleware, settingController.settingManage);
router.delete(
	'/SettingDelete/:id',
	authMiddleware,
	settingController.deleteByID,
);
router.get('/getall', authMiddleware, settingController.getRequest);
router.put('/update/:id', authMiddleware, settingController.updateByid);

module.exports = router;
