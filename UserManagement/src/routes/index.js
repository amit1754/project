import express from 'express';
const router = express.Router();

router.use('/permissions', require('./adminManagement/permissionsRoutes'));
router.use('/role', require('./adminManagement/roleRoutes'));
router.use('/admin-user', require('./adminManagement/adminUserRoutes'));
router.use('/user', require('./userRoutes'));

module.exports = router;
