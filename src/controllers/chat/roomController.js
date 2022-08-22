import {
	drService,
	CustomerService,
	chatRoomService,
} from '../../mongoServices';
import { chatRoomModel } from '../../models';
import { CONSTANTS } from '../../constants';
import { errorLogger } from '../../utils';
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, CHATROOM },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;
const createRoom = async (req, res) => {
	try {
		const { drId, patientId } = req.body;
		let filter = { _id: drId };
		let dr = await drService.findAllQuery(filter);
		filter = { _id: patientId };
		let patient = await CustomerService.findAllQuery(filter);
		if (dr.length == 0) {
			throw new Error(CHATROOM.DRNOTFOUND);
		} else if (patient.length == 0) {
			throw new Error(CHATROOM.PATIENTNOTFOUND);
		} else {
			let room = {
				drId: drId,
				patientId: patientId,
				appointmentID: req.body.appointmentID,
			};
			let chatRoom = await new chatRoomModel(room).save();
			console.log('chatRoom', chatRoom);
			return res.status(SUCCESS).send({
				success: true,
				message: CHATROOM.CREATE_SUCCESS,
				roomId: chatRoom._id,
			});
		}
	} catch (err) {
		errorLogger(req, res, err);
		return res.status(FAILED).send({
			success: false,
			message: err.message || FAILED_RESPONSE,
		});
	}
};

const sendMessage = async (req, res) => {
	try {
		const { roomId, content, senderId } = req.body;
		let filter = { _id: roomId };
		let chatRoom = await chatRoomService.findAllQuery(filter);
		if (chatRoom.length == 0) {
			throw new Error(CHATROOM.ROOMNOTFOUND);
		} else {
			let chatRoomUpdate = await chatRoomService.updateOneQuery(
				{ _id: roomId },
				{ chatContent: { content: content, senderId: senderId } },
			);
			console.log('chatRoomUpdate', chatRoomUpdate);
			if (chatRoomUpdate) {
				return res.status(SUCCESS).send({
					success: true,
					message: CHATROOM.SEND_SUCCESS,
				});
			} else {
				throw new Error(CHATROOM.SEND_FAILED);
			}
		}
	} catch (err) {
		console.log('err', err);
		errorLogger(req, res, err);
		return res.status(FAILED).send({
			success: false,
			message: err.message || FAILED_RESPONSE,
		});
	}
};
export default { createRoom, sendMessage };
