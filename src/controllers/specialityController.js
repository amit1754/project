import { specialityModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import path from 'path';
import fs from 'fs';
import { specialityService } from '../mongoServices';
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, SPECIALITY },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const createSpeciality = async (req, res) => {
	try {
		let { name, image, price, status, time } = req.body;

		let data = image.replace(/^data:image\/\w+;base64,/, '');
		let buf = new Buffer(data, 'base64');
		let image_name = name + '.png';
		const imagePath = path.join('src/images/', image_name);

		await fs.writeFileSync(imagePath, buf, (err, result) => {
			if (err) {
				return console.log(err);
			}
		});

		let SpecialityObj = {
			name: name,
			price: price,
			status: status,
			time: time,
			image: imagePath,
		};
		const Speciality = new specialityModel(SpecialityObj);
		const saveSpeciality = await Speciality.save();
		if (saveSpeciality) {
			return res.status(SUCCESS).send({
				success: true,
				msg: SPECIALITY.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(SPECIALITY.CREATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const updateSpeciality = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, time, price, status, image } = req.body;
		let img_result = image.startsWith('data:image');
		if (img_result) {
			let data = image.replace(/^data:image\/\w+;base64,/, '');
			let buf = new Buffer(data, 'base64');
			let image_name = name + '.png';
			const imagePath = path.join('src/images/', image_name);
			image = imagePath;
			await fs.writeFileSync(imagePath, buf, (err, result) => {
				if (err) {
					return console.log(err);
				}
			});
		}

		let filter = { _id: id },
			updateData = {
				name,
				time,
				price,
				status,
				image,
			};

		const updateSp = await specialityService.updateOneQuery(filter, updateData);

		if (updateSp) {
			return res.status(SUCCESS).send({
				success: true,
				msg: SPECIALITY.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(SPECIALITY.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const deleteSpeciality = async (req, res) => {
	try {
		const { id } = req.params;
		let filter = { _id: id },
			updateData = {
				deletedAt: new Date(),
				// deletedBy: req.user._id,
			};
		const deleteSpeciality = await specialityService.updateOneQuery(
			filter,
			updateData,
		);

		if (deleteSpeciality) {
			return res.status(SUCCESS).send({
				success: true,
				msg: SPECIALITY.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(SPECIALITY.DELETE_FAILED);
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

const listAllSpeciality = async (req, res) => {
	try {
		let filter = { _id: '' };
		const { data, totalCount } = await specialityService.findAllQuery(filter);
		if (data) {
			return res.status(SUCCESS).send({
				success: true,
				msg: SPECIALITY.LIST_SUCCESS,
				data,
				totalCount,
			});
		} else {
			throw new Error(SPECIALITY.LIST_FAILED);
		}
	} catch (error) {
		console.log(error);
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
export default {
	createSpeciality,
	updateSpeciality,
	deleteSpeciality,
	listAllSpeciality,
};
