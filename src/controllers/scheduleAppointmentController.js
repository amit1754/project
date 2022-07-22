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
		const { id } = req.body;
		let filter = { _id: Types.ObjectId(id), isSchedule: false };
		const { data } = await appointmentService.findAllQuery(filter);
		console.log('data', data.length);
		if (data.length != 0 && data[0]?.isSchedule === false) {
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
			console.log('availableDr', availableDr);
			if (availableDr) {
				let drIds = availableDr.map((x) => x._id);
				let filterDr = {
					_id: { $in: drIds },
					date: { $gte: startDate, $lte: endDate },
				};
				const { data: drAppointmentData } =
					await scheduleAppointmentService.findAllQuery(filterDr);

				console.log('drAppointmentData', drAppointmentData);
				if (drAppointmentData.length == 0) {
					let drAppointment = {
						drId: drIds,
						appointmentId: id,
						patientId: appointmentData.patientId,
						timeSlot: {
							startTime: appointmentData.startTime,
							endTime: appointmentData.endTime,
						},
						date: appointmentData.date,
					};
					console.log('drAppointment', drAppointment);
					// let createAppointment = new scheduleAppointmentModel(drAppointment);
					// let saveAppointment = await createAppointment.save();
					// let filterA = { _id: Types.ObjectId(id) };
					// let updateAppointment = { isSchedule: true, drId: availableDr._id };
					// await appointmentService.updateOneQuery(filterA, updateAppointment);
					return res.status(200).json({
						success: true,
						data: true,
					});
				} else {
					throw new Error('Slot is not available');
				}
			} else {
				throw new Error('Doctor is not available');
			}
		} else {
			return res.status(500).json({
				success: false,
				message: 'Appointment already schedule',
			});
		}
	} catch (error) {
		console.log('error', error);
		// errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(500).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const getScheduleAppointment = async (_req, res) => {
	try {
		let filter = {};
		const { data } = await scheduleAppointmentService.findAllQuery(filter);
		return res.status(200).json({
			success: true,
			data,
		});
	} catch (error) {
		console.log('error', error);
		// errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(500).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

export default { scheduleAppointment, getScheduleAppointment };
