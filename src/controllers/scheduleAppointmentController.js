import {
	appointmentService,
	drService,
	scheduleAppointmentService,
} from '../mongoServices';
import { scheduleAppointmentModel } from '../models';
import { Types } from 'mongoose';
import moment from 'moment';
const scheduleAppointment = async (req, res) => {
	try {
		const { id, date } = req.body;
		let filter = { _id: Types.ObjectId(id), isSchedule: false };
		const { data } = await appointmentService.findAllQuery(filter);
		if (data) {
			let appointmentData = data[0];

			let findDrFilter = { specialization: { $in: appointmentData.symptoms } };
			let { data: dr } = await drService.findAllQuery(findDrFilter);

			const availableDr = dr.find((x) => {
				if (x.timeSlot != null) {
					return x.timeSlot.find((y) => {
						if (y.startTime == appointmentData.startTime) return x._id;
					});
				}
			});
			let startDate = moment(appointmentData.date).startOf('day').toISOString();
			let endDate = moment(appointmentData.date).endOf('day').toISOString();

			if (availableDr) {
				let filterDr = {
					_id: { $in: availableDr },
					date: { $gte: startDate, $lte: endDate },
				};
				const { data: drAppointmentData } =
					await scheduleAppointmentService.findAllQuery(filterDr);
				console.log('drAppointmentData', drAppointmentData);
				if (drAppointmentData.length == 0) {
					let drAppointment = {
						drId: availableDr._id,
						appointmentId: id,
						customerId: appointmentData.patientId,
						timeSlot: {
							startTime: appointmentData.startTime,
							endTime: appointmentData.endTime,
						},
						date: appointmentData.date,
					};
					let createAppointment = new scheduleAppointmentModel(drAppointment);
					let saveAppointment = await createAppointment.save();
					let filterA = { _id: Types.ObjectId(id) };
					let updateAppointment = { isSchedule: true, drId: availableDr._id };
					await appointmentService.updateOneQuery(filterA, updateAppointment);
					return res.status(200).json({
						success: true,
						data: saveAppointment,
					});
				} else {
					throw new Error('Doctor is not available');
				}
			} else {
				throw new Error('Doctor is not available');
			}
		} else {
			return res.status(500).json({
				success: false,

				message: 'No data found',
			});
		}
	} catch (error) {
		// errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(500).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

export default { scheduleAppointment };
