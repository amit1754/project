import { appointmentModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import { appointmentService, specialityService } from '../mongoServices';
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, APPOINTMENT },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;
const createAppointment = async (req, res) => {
	try {
		const { currentUser } = req;
		const { pain, date, startTime, endTime } = req.body;
		let totalPrice = 0;
		if (pain.length === 0) {
			let query = { _id: pain };
			let { data } = await specialityService.findAllQuery(query);

			totalPrice = data[0].price;
		} else {
			for (const element of pain) {
				let query = { _id: element };
				let { data } = await specialityService.findAllQuery(query);

				totalPrice += data[0].price;
			}
		}
		let updateDate = new Date(date).setHours(8);
		let payloadData = {
			date: updateDate,
			startTime,
			endTime,
			symptoms: pain,
			patientId: currentUser._id,
			price: totalPrice,
		};
		const payload = new appointmentModel(payloadData);
		const savePayload = await payload.save();
		if (savePayload) {
			return res.status(SUCCESS).send({
				success: true,
				msg: APPOINTMENT.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(APPOINTMENT.CREATE_FAILED);
		}
	} catch (err) {
		errorLogger(err.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			error: err.message || FAILED_RESPONSE,
			success: false,
		});
	}
};
const getAppointment = async (req, res) => {
	try {
		let { data, totalCount } = await appointmentService.findAllQuery(req.query);
		if (data) {
			return res.status(SUCCESS).json({
				success: true,
				message: APPOINTMENT.GET_SUCCESS,
				data,
				totalCount,
			});
		} else {
			throw new Error(HEALTH_ARTICLE.GET_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);

		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const updateAppointment = async (req, res) => {
	try {
		const filter = { _id: req.params.id };
		const update = {
			...req.body,
		};
		const projection = {};
		const AppointmentUpdate = await appointmentService.updateOneQuery(
			filter,
			update,
			projection,
		);
		if (AppointmentUpdate) {
			return res.status(SUCCESS).send({
				success: true,
				message: APPOINTMENT.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(APPOINTMENT.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			success: false,
			message: APPOINTMENT.UPDATE_FAILED,
			data: [],
		});
	}
};
const deleteAppointment = async (req, res) => {
	try {
		const { id } = req.params;
		let filter = { _id: id },
			updateData = {
				isEnabledL: false,
				deletedAt: new Date(),
				deletedBy: req.currentUser._id,
			};
		const deleteAPP = await appointmentService.updateOneQuery(
			filter,
			updateData,
		);

		if (deleteAPP) {
			return res.status(SUCCESS).send({
				success: true,
				msg: APPOINTMENT.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(APPOINTMENT.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

export default {
	createAppointment,
	getAppointment,
	updateAppointment,
	deleteAppointment,
};
