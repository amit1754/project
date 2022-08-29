import { Schema, model, Types } from 'mongoose';

const offersModel = new Schema(
	{
		name: {
			type: String,
		},
		type: {
			type: String,
			enum: ['percentage', 'amount'],
		},
		percentage: {
			type: Number,
		},
		amount: {
			type: Number,
		},
		maxAmount: {
			type: Number,
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

module.exports = new model('offers_details', offersModel);
