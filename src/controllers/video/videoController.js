import { videoCallModel } from '../../models';
const createVideoCallRoom = (data) => {
	let createVideoCall = new videoCallModel(data).save();
	return createVideoCall;
};

export default { createVideoCallRoom };
