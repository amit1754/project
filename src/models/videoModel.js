import { Schema, model, Types } from 'mongoose';

const videoCall = new Schema(
	{
		appointmentId: {
			type: Types.ObjectId,
			ref: 'appointments',
		},
		patientId: {
			type: Types.ObjectId,
			ref: 'customer_details',
		},
		timeSlotId: {
			type: Types.ObjectId,
			ref: 'timeSlotALL',
		},
		drId: {
			type: Types.ObjectId,
			ref: 'dr_details',
			default: null,
		},
		date: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = new model('videoCallRoom', videoCall);
