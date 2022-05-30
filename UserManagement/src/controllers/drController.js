import { drModel, customerModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger, otpGenerator, SendEmail } from '../utils';
import { hashPassword } from '../utils';
const {
	RESPONSE_MESSAGE: { DR_USER, FAILED_RESPONSE, CUSTOMER_MESSAGE },
	STATUS_CODE: { SUCCESS, FAILED },
	USER_TYPE: { CUSTOMER },
} = CONSTANTS;

const createDr = async (req, res) => {
	try {
		const createOtp = otpGenerator();
		const { email, password, type } = req.body;
		const { hashedPassword, salt } = await hashPassword(password);

		const insertObj = {
			...req.body,
			otp: createOtp,
			password: hashedPassword,
			salt: salt,
		};

		if (type === CUSTOMER) {
			const findCustomer = await customerModel.findOne({ email });
			if (findCustomer) {
				throw new Error(CUSTOMER_MESSAGE.USER_AVAILABLE);
			} else {
				const customer = new customerModel(insertObj);
				const saveCustomer = await customer.save();
				if (saveCustomer) {
					await SendEmail.sendRegisterEmail(
						email,
						createOtp,
						saveCustomer.name,
					);
					return res.status(SUCCESS).send({
						success: true,
						msg: CUSTOMER_MESSAGE.CREATE_SUCCESS,
						data: [],
					});
				} else {
					throw new Error(CUSTOMER_MESSAGE.CREATE_FAILED);
				}
			}
		} else {
			const saveDr = new drModel(insertObj);
			const saveResponse = await saveDr.save();

			if (saveResponse) {
				await SendEmail.sendRegisterEmail(
					insertObj.email,
					createOtp,
					saveResponse.name,
				);
				return res.status(SUCCESS).send({
					success: true,
					msg: DR_USER.CREATE_SUCCESS,
					data: [],
				});
			} else {
				throw new Error(DR_USER.CREATE_FAILED);
			}
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
const verifyOtp = async (req, res) => {
	try {
		const { otp, email, type } = req.body;
		console.log('type', type);
		if (type === CUSTOMER) {
			console.log('email, otp: Number(otp)', email, Number(otp));
			const findAndVerify = await drModel.findOne(
				{ email, otp: Number(otp) },
				// { $set: { otp: '', isEnabled: true } },
				// { new: true },
			);
			console.log('findAndVerify', findAndVerify);
			if (findAndVerify) {
				return res.status(SUCCESS).send({
					success: true,
					msg: CUSTOMER_MESSAGE.VERIFY_SUCCESS,
					data: [],
				});
			} else {
				throw new Error(CUSTOMER_MESSAGE.VERIFY_FAILED);
			}
		} else {
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
		}
	} catch (error) {
		console.log('error', error);
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
