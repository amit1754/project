import express from 'express';
import { validator } from '../validation';
import { specialityController } from '../controllers';
import { authMiddleware } from '../middleware';
const router = express.Router();

router.post(
	'/create',
	validator.specialityCreateValidator,
	specialityController.createSpeciality,
);

router.post('/update/:id', specialityController.updateSpeciality);
router.delete(
	'/delete/:id',

	specialityController.deleteSpeciality,
);
router.get(
	'/listAllSpeciality/:id?/:search?/:limit?',
	specialityController.listAllSpeciality,
);
module.exports = router;
