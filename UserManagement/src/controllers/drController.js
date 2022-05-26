import { drModel } from '../models';
import { CONSTANTS, ENV } from '../constants';
import { errorLogger, otpGenerator } from '../utils';
import { sendMail, hashPassword } from '../utils';
const {
	RESPONSE_MESSAGE: { DR_USER, FAILED_RESPONSE, INVALID_OBJECTID },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;
const {
	SENDGRID: { EMAIL },
} = ENV;
const createDr = async (req, res) => {
	try {
		const createOtp = otpGenerator();
		const { password } = req.body;
		const { hashedPassword, salt } = hashPassword(password);
		const insertObj = {
			...req.body,
			otp: createOtp,
			password: hashedPassword,
			salt,
		};
		const saveDr = new drModel(insertObj);
		const saveResponse = await saveDr.save();

		if (saveResponse) {
			const html = `
				Hello ${saveResponse?.name} ,
					Otp: ${createOtp}`;

			// Send Confirm Account Email
			const sendEmail = await sendMail(
				req.body.email,
				EMAIL,
				'register with curific',
				html,
			);
			console.log('sendEmail', sendEmail);
			if (sendEmail[0].statusCode != 202) {
				throw new Error('mail is not send');
			}
			return res.status(SUCCESS).send({
				success: true,
				msg: DR_USER.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(DR_USER.CREATE_FAILED);
		}
	} catch (error) {
		console.log('error', error);
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
const verifyOtp = async (req, res) => {
	try {
		const { otp, email } = req.body;
		const findDr = await drModel.findOne({ email, isEnabled: false });
		if (findDr) {
			if (findDr.otp === otp) {
				await drModel.findOneAndUpdate(
					{ email },
					{ $set: { isEnabled: true } },
					{ new: true },
				);
				return res.status(SUCCESS).send({
					success: true,
					msg: DR_USER.VERIFY_SUCCESS,
					data: [],
				});
			} else {
				throw new Error(DR_USER.VERIFY_FAILED);
			}
		} else {
			throw new Error(DR_USER.VERIFY_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const updateProfile = async (req, res) => {
	try {
		const { id } = req.params;
		const { mainStream, specialization, designation } = req.body;
		const updateDr = await drModel.findOneAndUpdate(
			{ _id: id },
			{ $set: { mainStream, specialization, designation } },
			{ new: true },
		);
		if (updateDr) {
			return res.status(SUCCESS).send({
				success: true,
				msg: DR_USER.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(DR_USER.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const deleteDr = async (req, res) => {
	try {
		const { id } = req.params;
		const deleteDr = await drModel.findOneAndUpdate(
			{ _id: id },
			{
				$set: { isEnabled: false, deletedBy: req.user._id, deletedAt: Date() },
			},
			{ new: true },
		);
		if (deleteDr) {
			return res.status(SUCCESS).send({
				success: true,
				msg: DR_USER.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(DR_USER.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const loginDr = async (req, res) => {
	try {
		const { email, password } = req.body;
		const findDr = await drModel.findOne({ email, isEnabled: true });
		if (findDr) {
			if (findDr.password === password) {
				return res.status(SUCCESS).send({
					success: true,
					msg: DR_USER.LOGIN_SUCCESS,
					data: [findDr],
				});
			} else {
				throw new Error(DR_USER.LOGIN_FAILED);
			}
		} else {
			throw new Error(DR_USER.LOGIN_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

export default {
	createDr,
	verifyOtp,
	updateProfile,
	deleteDr,
	loginDr,
};
