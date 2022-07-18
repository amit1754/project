import { appointmentModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import { specialityService } from '../mongoServices';
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
		console.log('err', err);
		errorLogger(err.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			error: err.message || FAILED_RESPONSE,
			success: false,
		});
	}
};

export default {
	createAppointment,
};
