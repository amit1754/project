import { userModel } from '../models';
import { errorLogger } from '../utils';

import { otpGenerator } from '../utils';

const createUser = async (req, res) => {
	try {
		if (req.body) {
			const Model = await new userModel(req.body);
			const saveResponse = await Model.save();
			let createOtp = otpGenerator();
			if (saveResponse) {
				res.status(200).json({
					success: true,
					message: 'success',
					data: saveResponse,
					createOtp,
				});
			} else {
				throw new Error();
			}
		} else {
			throw new Error();
		}
	} catch (error) {
		res.status(400).json({
			success: false,
		});
	}
};
const getAllUser = async (req, res) => {
	try {
		let whereClause = { isEnabled: true };

		const getData = await userModel.find(whereClause);
		const totalCount = await userModel.find(whereClause).countDocuments();

		const saveResponse = await getData;
		if (saveResponse) {
			res.status(200).json({
				message: 'data found successfully',
				data: saveResponse,
				totalCount,
			});
		}
		console.log('getData', getData);
	} catch (error) {
		res.status(400).json({
			success: false,
		});
	}
};
const getById = async (req, res) => {
	try {
		let whereClause = { isEnabled: true };
		let _id = req.params.id;
		if (_id) {
			whereClause = {
				...whereClause,
				_id,
			};
		}
		let allLanguage = await userModel.find(whereClause);
		const totalCount = await userModel.find(whereClause).countDocuments();
		if (allLanguage) {
			return res.status(200).send({
				success: true,
				data: allLanguage,
				totalCount,
			});
		} else {
			throw new Error();
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(400).json({
			success: false,
		});
	}
};
const deleteData = async (req, res) => {
	try {
		const consult = await userModel.updateOne(
			{ _id: req.params.id },
			{ isEnabled: false },
		);
		if (consult) {
			return res.status(200).send({
				success: true,
				message: 'Delete User successfully...',
			});
		} else {
			throw new Error();
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(400).json({
			success: false,
		});
	}
};
const updateOneQuery = async (filter, update) => {
	let options = { new: true };

	const data = await userModel.findOneAndUpdate(filter, update, options);
	return data;
};
const updateData = async (req, res) => {
	try {
		const filter = { _id: req.params.id };
		const updateObj = {
			...req.body,
		};
		const updatePackageResponse = await updateOneQuery(filter, updateObj);
		if (updatePackageResponse) {
			res.status(200).json({
				status: true,
				message: 'User Detail Update...',
			});
		} else {
			throw new Error();
		}
	} catch (err) {
		errorLogger(err);
		res.status(400).json({
			status: false,
			error: err.message,
		});
	}
};

export default {
	createUser,
	getAllUser,
	getById,
	deleteData,
	updateData,
};
