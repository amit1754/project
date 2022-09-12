import { Schema, model, Types } from 'mongoose';
const UserSchema = new Schema(
	{
		Name: {
			type: String,
		},
		email: {
			type: String,
			trim: true,
			max: 255,
		},
		isEnabled: {
			type: Boolean,
			required: true,
			default: true,
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

module.exports = new model('user', UserSchema);
