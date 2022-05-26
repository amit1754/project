import express from 'express';
const router = express.Router();

router.use('/permissions', require('./adminManagement/permissionsRoutes'));
router.use('/role', require('./adminManagement/roleRoutes'));
router.use('/admin-user', require('./adminManagement/adminUserRoutes'));
router.use('/dr-user', require('./drRoutes'));

module.exports = router;
