import express from 'express';
const router = express.Router();


router.use('/permissions', require('./adminManagement/permissionsRoutes'));
router.use('/role', require('./adminManagement/roleRoutes'));
router.use('/adminuser', require('./adminManagement/adminUserRoutes'));


module.exports = router;
