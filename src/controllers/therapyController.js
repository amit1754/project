import { therapyModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import { therapyService } from '../mongoServices';
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, THERAPY },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;
const addTherapy = async (req, res) => {
	try {
		const { body } = req;
		const payload = new therapyModel(body);
		const data = await payload.save();
		if (data) {
			res.status(SUCCESS).json({
				status: true,
				msg: THERAPY.ADD_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(THERAPY.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error);
		res.status(FAILED).json({
			status: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const getTherapy = async (req, res) => {
	try {
		const { data, totalCount } = await therapyService.findAllQuery(req.query);
		if (data) {
			res.status(SUCCESS).json({
				status: true,
				msg: THERAPY.GET_SUCCESS,
				data,
				totalCount,
			});
		} else {
			throw new Error(THERAPY.GET_FAILED);
		}
	} catch (error) {
		errorLogger(error);
		res.status(FAILED).json({
			status: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const deleteTherapy = async (req, res) => {
	try {
		const filter = { _id: req.params.id };
		const update = {
			isDeleted: true,
			deletedBy: req.currentUser._id,
			deletedAt: Date.now(),
			isEnabled: false,
		};
		const projection = {};
		const deletePackageResponse = await therapyService.updateOneQuery(
			filter,
			update,
			projection,
		);
		if (deletePackageResponse) {
			res.status(SUCCESS).json({
				status: true,
				msg: THERAPY.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(THERAPY.DELETE_FAILED);
		}
	} catch (err) {
		errorLogger(err);
		res.status(FAILED).json({
			status: false,
			error: err.message || FAILED_RESPONSE,
		});
	}
};

const updateTherapy = async (req, res) => {
	try {
		const filter = { _id: req.params.id };
		const updateObj = {
			...req.body,
		};
		const projection = {};
		const updatePackageResponse = await therapyService.updateOneQuery(
			filter,
			updateObj,
			projection,
		);
		if (updatePackageResponse) {
			res.status(SUCCESS).json({
				status: true,
				msg: THERAPY.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(THERAPY.UPDATE_FAILED);
		}
	} catch (err) {
		errorLogger(err);
		res.status(FAILED).json({
			status: false,
			error: err.message || FAILED_RESPONSE,
		});
	}
};

export default {
	addTherapy,
	getTherapy,
	deleteTherapy,
	updateTherapy,
};
