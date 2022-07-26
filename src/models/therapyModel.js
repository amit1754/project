import { Schema, model, Types } from 'mongoose';

const therapyModel = new Schema(
	{
		name: {
			type: String,
			trim: true,
			max: 255,
			required: true,
			unique: true,
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

module.exports = new model('therapy', therapyModel);
