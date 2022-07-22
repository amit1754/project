import { Schema, model, Types } from 'mongoose';

const scheduleAppointment = new Schema(
	{
		appointmentId: {
			type: Types.ObjectId,
			ref: 'appointment',
		},
		drId: {
			type: Types.ObjectId,
			ref: 'dr_details',
		},
		customerId: {
			type: Types.ObjectId,
			ref: 'customer_details',
		},
		timeSlot: {
			startTime: {
				type: String,
			},
			endTime: {
				type: String,
			},
		},
		date: {
			type: Date,
		},

		deletedAt: {
			type: Date,
			default: null,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		deletedBy: {
			type: Types.ObjectId,
			default: null,
		},
	},
	{ timestamps: true },
);

module.exports = new model('scheduleAppointment', scheduleAppointment);
