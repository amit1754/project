import express from 'express';
import { validator } from '../validation';
import { specialityController } from '../controllers';
import { authMiddleware } from '../middleware';
import upload from '../utils/fileUpload';

const router = express.Router();

router.post(
	'/create',
	upload.single('image'),
	validator.specialityCreateValidator,
	specialityController.createSpeciality,
);

router.post(
	'/update/:id',
	upload.single('image'),
	specialityController.updateSpeciality,
);
router.delete(
	'/delete/:id',

	specialityController.deleteSpeciality,
);
router.get(
	'/listAllSpeciality/:id?/:search?/:limit?',
	specialityController.listAllSpeciality,
);
module.exports = router;
