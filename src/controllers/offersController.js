import { offersModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import { offersService } from '../mongoServices';
const {
	RESPONSE_MESSAGE: { OFFERS, FAILED_RESPONSE },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const setOffers = async (req, res) => {
	try {
		let payload = {};
		if (req.body.amount) {
			payload = {
				percentage: 0,
				...req.body,
			};
		} else {
			payload = {
				amount: 0,
				maxAmount: 0,
				...req.body,
			};
		}
		const offers = new offersModel(payload);
		offers.save();
		return res
			.status(200)
			.json({ success: true, message: OFFERS.CREATE_SUCCESS, data: offers });
	} catch (error) {
		return res
			.status(500)
			.json({ error: error.message || OFFERS.CREATE_FAILED, success: false });
	}
};

const getOffers = async (req, res) => {
	try {
		const filter = req.params;
		const offer = await offersService.findAllQuery(filter);
		if (offer)
			return res
				.status(200)
				.json({ success: true, message: OFFERS.GET_SUCCESS, data: offer.data });
		else {
			throw new Error(OFFERS.GET_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || OFFERS.GET_FAILED,
		});
	}
};

const updateOffers = async (req, res) => {
	try {
		let filter = { _id: req.params.id };
		const projection = {};
		let payload = {};
		if (req.body.amount) {
			payload = {
				percentage: 0,
				...req.body,
			};
		} else {
			payload = {
				amount: 0,
				maxAmount: 0,
				...req.body,
			};
		}
		const offers = await offersService.updateOneQuery(
			filter,
			payload,
			projection,
		);
		if (offers) {
			return res.status(SUCCESS).send({
				success: true,
				msg: OFFERS.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(OFFERS.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || OFFERS.UPDATE_FAILED,
		});
	}
};

const deleteOffer = async (req, res) => {
	try {
		const offerId = req.params.id;
		await offersService.deleteOneQuery(offerId);
		return res
			.status(200)
			.json({ success: true, message: OFFERS.DELETE_SUCCESS });
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || OFFERS.DELETE_FAILED,
		});
	}
};

export default {
	setOffers,
	getOffers,
	updateOffers,
	deleteOffer,
};
