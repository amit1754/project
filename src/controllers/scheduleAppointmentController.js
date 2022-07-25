import {
	appointmentService,
	drService,
	scheduleAppointmentService,
} from '../mongoServices';

import { Types } from 'mongoose';
import moment from 'moment';
import _ from 'lodash';
const scheduleAppointment = async (req, res) => {
	try {
		const { id } = req.body;
		let filter = { _id: Types.ObjectId(id), isSchedule: false };
		const { data } = await appointmentService.findAllQuery(filter);

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

			if (availableDr) {
				let drIds = availableDr.map((x) => x._id);
				let filterDr = {
					_id: { $in: drIds },
					date: { $gte: startDate, $lte: endDate },
				};
				const { data: drAppointmentData } =
					await scheduleAppointmentService.findAllQuery(filterDr);

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
		// errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(500).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const getScheduleAppointment = async (_req, res) => {
	try {
		const { data } = await drService.findAllQuery({});
		let timeSlot = [];
		for (const element of data) {
			let { data: appointment } = await scheduleAppointmentService.findAllQuery(
				{
					drId: element._id,
				},
			);

			if (appointment.length == 0) {
				element.timeSlot.map((x) => {
					timeSlot.push(x);
				});
			}
		}
		let timeSlotData = _.uniqBy(timeSlot, '_id');
		return res.status(200).json({
			success: true,
			data: timeSlotData,
		});
	} catch (error) {
		// errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(500).json({
			success: false,
			error: error,
		});
	}
};

export default { scheduleAppointment, getScheduleAppointment };
