import { Schema, model, Types } from 'mongoose';

const consultModel = new Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		startTime: {
			type: String,
			required: true,
		},
		endTime: {
			type: String,
			required: true,
		},
		patientId: {
			type: Types.ObjectId,
			required: true,
			ref: 'customer_details',
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		drId: {
			type: Types.ObjectId,
			ref: 'dr_details',
			default: null,
		},

		consultModel: {
			type: String,
			default: 'VIDEO',
		},
		prescription: {
			type: String,
			default: null,
		},
		notes: {
			type: String,
			default: null,
		},
		isSchedule: {
			type: Boolean,
			default: false,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
		deletedBy: {
			type: Types.ObjectId,
			default: null,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

module.exports = new model('appointment', consultModel);
