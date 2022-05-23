import express from 'express';
import { validator } from '../validation';
import { drController } from '../controllers';
const router = express.Router();

// call_back CRUD Routes
router.post('/create', validator.drCreateValidator, drController.createDr);

module.exports = router;
