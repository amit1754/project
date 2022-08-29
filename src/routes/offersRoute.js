import express from 'express';
import { offersController } from '../controllers';

const router = express.Router();

router.post('/create', offersController.setOffers);
router.get('/getOffers', offersController.getOffers);
router.put('/updateOffer/:id', offersController.updateOffers);
router.put('/deleteOffer/:id', offersController.deleteOffer);

module.exports = router;
