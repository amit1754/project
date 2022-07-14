const Setting = require('../models/settingModel');
import { settingService } from '../mongoServices';


const settingManage = async (req, res) => {
	try {
		if (req.body) {
			const Model = await new Setting(req.body);
			const saveResponse = await Model.save();
			if (saveResponse) {
				res.status(200).json({
					success: true,
					message: 'add request..',
					data: saveResponse,
				});
			} else {
				throw new Error('Error...');
			}
		} else {
			throw new Error('name is not provided');
		}
	} catch (error) {
		console.log('error', error);
		res.status(400).json({
			success: false,
			error: error.message || 'failed',
		});
	}
};

const deleteByID = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await new settingService.removeSetting(id);
			if (response) {
				res.status(200).json({
					success: true,
					message: 'Delete user..',
				});
			} else {
				throw new Error('Error...');
			}
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message || 'failed',
		});
	}
};
const getRequest = async (req, res) => {
	try {
		const { _id } = req.query;
		var response;
		if (_id) {
			response = await Setting.find({
				_id: _id,
				$and: [{ _id: _id }, { isEnabled: true }],
			});
		} else {
			response = await Setting.find({ isEnabled: true });
		}
		if (response) {
			res.status(200).json({
				success: true,
				data: response,
				message: response ? 'user found' : 'user not found',
			});
		} else {
			throw new Error('user not found!');
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message || 'failed',
		});
	}
};
const getSetting = async (req, res) => {
	try {
		const getSetting = await settingService.findAllQuery(req.query);
		if (getSetting) {
			return res.status(200).send({
				success: true,
				message: 'Data found...',
				data: getSetting,
			});
		} else {
			throw new Error(error.messageD);
		}
	} catch (error) {
		return res.status(400).json({
			success: false,
			error: error.message || 'failed',
		});
	}
};

const updatekeyId = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await settingService.findBy(id);
		if (data) {
			const response = settingService.updateOne(id, req.body);
			response
				.then((data) => {
					res.status(200).json({
						success: true,
						data: data,
						message: 'update successfully',
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} else {
			throw new Error('user not found!..');
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message || 'failed',
		});
	}
};

export default {
	settingManage,
	deleteByID,
	getRequest,
	updatekeyId,
	getSetting
	
};
