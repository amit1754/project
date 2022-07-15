import { healthModel } from '../models';
import { healthService } from '../mongoServices';
const create = async (req, res) => {
	try {
		var payload = {
			...req.body,
			profileImage: req.file.path,
		};
		const Model = new healthModel(payload);
		const saveResponse = await Model.save();
		if (saveResponse) {
			res.status(200).json({
				success: true,
				message: 'user created ...',
				data: saveResponse,
			});
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
		const response = await new healthService.RemoveDetail(id);
		if (response) {
			res.status(200).json({
				success: true,
				message: 'Delete user..',
				data: response

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
const getData = async (req, res) => {
	try {
		const getData = await healthService.findAllQuery(req.query);
		if (getData) {
			return res.status(200).send({
				success: true,
				message: 'Data found...',
				data: getData,
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
const updateByid = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await healthService.findby(id);
		if (data) {
			const response = healthService.updateOne(id, req.body);
			response
			if (getData) {
				return res.status(200).send({
					success: true,
					message: 'Data found...',
					data: getData,
				});
			} else {
				throw new Error(error.messageD);
			}
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
	create,
	deleteByID,
	getData,
	updateByid
};
