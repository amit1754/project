import express from 'express';
import { validator } from '../../validation';
import { authMiddleware, resetPasswordMiddleware } from '../../middleware';
import { adminUserController } from '../../controllers';
const router = express.Router();

// call_back CRUD Routes
// router.post(
// 	'/create',
// 	validator.adminUserValidation,
// 	authMiddleware,
// 	adminUserController.adminUserCreate,
// );
// router.post(
// 	'/login',
// 	validator.adminUserLoginValidation,
// 	adminUserController.adminUserLogin,
// );

router.get('/get', authMiddleware, adminUserController.adminUserList);
// router.put(
// 	'/update/:id',
// 	validator.adminUserUpdateValidation,
// 	authMiddleware,
// 	adminUserController.adminUserUpdate,
// );
// router.put('/status/:id', authMiddleware, adminUserController.adminUserStatus);
router.delete(
	'/delete/:id',
	authMiddleware,
	adminUserController.adminUserDelete,
);

// router.put(
// 	'/changePassword',
// 	validator.adminUserPasswordChangeValidation,
// 	authMiddleware,
// 	adminUserController.adminUserChangePassword,
// );

// router.post(
// 	'/forget-password',
// 	validator.forgetPasswordValidation,
// 	adminUserController.forgetPassword,
// );
// router.put(
// 	'/reset-password',
// 	validator.resetPasswordValidation,
// 	resetPasswordMiddleware,
// 	adminUserController.resetPassword,
// );

module.exports = router;
