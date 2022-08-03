import { Schema, model, Types } from 'mongoose';

const paymentModel = new Schema(
	{
		paymentId: {
			type: String,
		},
		type: {
			type: String,
			enum: ['APPOINTMENT', 'PACKAGE'],
			default: 'APPOINTMENT',
		},

		appointmentId: {
			type: Types.ObjectId,
			ref: 'appointments',
			default: null,
		},
		packageId: {
			type: Types.ObjectId,
			ref: 'subscriptionpackages',
			default: null,
		},
		baseAmount: {
			type: Number,
		},
		paidAmount: {
			type: Number,
		},
		discountAmount: {
			type: Number,
		},
		otherDetails: {
			type: Object,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
		deletedBy: {
			type: Types.ObjectId,
			default: null,
		},
	},
	{ timestamps: true },
);

module.exports = new model('paymentDetails', paymentModel);
