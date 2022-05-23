import express from 'express';
import { validator } from '../../validation';
import { authMiddleware, resetPasswordMiddleware } from '../../middleware';
import { adminUserController } from '../../controllers';
const router = express.Router();

// call_back CRUD Routes
router.post(
	'/create',
	validator.adminUserValidation,
	authMiddleware,
	adminUserController.adminUserCreate,
);
router.post(
	'/login',
	adminUserController.adminUserLogin,
);

router.get('/get', authMiddleware, adminUserController.adminUserList);
router.put(
	'/update/:id',
	validator.adminUserValidation,
	authMiddleware,
	adminUserController.adminUserUpdate,
);
router.put('/status/:id', authMiddleware, adminUserController.adminUserStatus);
router.delete(
	'/delete/:id',
	authMiddleware,
	adminUserController.adminUserDelete,
);

router.put(
	'/changePassword',
<<<<<<< HEAD
	validator.adminUserPasswordChangeValidation,
=======
>>>>>>> c130023b755ddc2f4af041f0480531f4fef72003
	authMiddleware,
	adminUserController.adminUserChangePassword,
);

router.post(
	'/forget-password',
<<<<<<< HEAD
	validator.forgetPasswordValidation,
=======
>>>>>>> c130023b755ddc2f4af041f0480531f4fef72003
	adminUserController.forgetPassword,
);
router.put(
	'/reset-password',
<<<<<<< HEAD
	validator.resetPasswordValidation,
=======
>>>>>>> c130023b755ddc2f4af041f0480531f4fef72003
	resetPasswordMiddleware,
	adminUserController.resetPassword,
);

module.exports = router;
