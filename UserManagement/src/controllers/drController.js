import { drModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger, otpGenerator } from '../utils';
const {
	RESPONSE_MESSAGE: { DR_USER, FAILED_RESPONSE, INVALID_OBJECTID },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const createDr = async (req, res) => {
	try {
		const createOtp = otpGenerator();
		const insertObj = {
			...req.body,
			otp: createOtp,
		};
		const saveDr = new drModel(insertObj);
		const saveResponse = await saveDr.save();
		if (saveResponse) {
			// const html = `
			// 	Hello ${saveResponse?.name} ,
			// 		Otp: ${createOtp}`;

			// Send Confirm Account Email
			// const sendEmail = await sendMail(
			// 	email,
			// 	process.env.SENDGRID_EMAIL,
			// 	req.body.email,
			// 	html,
			// );
			// if (sendEmail[0].statusCode != 202) {
			// 	throw new Error('mail is not send');
			// }
			return res.status(SUCCESS).send({
				success: true,
				msg: DR_USER.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(DR_USER.CREATE_FAILED);
		}
	} catch (error) {
		if (error.code === 11000) {
			error.message = DR_USER.ALREADY_AVAILABLE;
		}
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

export default {
	createDr,
};
