import express from 'express';
import { offersController } from '../controllers';

const router = express.Router();

router.post('/create', offersController.setOffers);
router.get('/get', offersController.getOffers);
router.put('/update/:id', offersController.updateOffers);
router.delete('/delete/:id', offersController.deleteOffer);

module.exports = router;
