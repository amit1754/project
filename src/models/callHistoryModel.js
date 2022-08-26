import { Schema, model, Types } from 'mongoose';

const callHistoryModel = new Schema(
	{
		videoCallRoomId: {
			type: Types.ObjectId,
			ref: 'videoCallRoom',
		},
		startTime: {
			type: Date,
		},
		endTime: {
			type: Date,
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
		isPatientJoin: {
			type: Boolean,
			default: false,
		},
		isDrJoin: {
			type: Boolean,
			default: false,
		},
		isCallNotConnect: {
			type: Boolean,
			default: false,
		},
		callNotConnectReason: {
			type: String,
			default: null,
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

module.exports = new model('callHistory', callHistoryModel);
