import { CONSTANTS } from '../constants';
import { sliderModel } from '../models';
import { sliderService } from '../mongoServices';
const {
	IMAGE_DATA: {
		CREATE_SUCCESS,
		GET_FAILED,
		GET_SUCCESS,
		UPDATE_SUCCESS,
		UPDATE_FAILED,
	},
} = CONSTANTS;

const createSliderImages = async (req, res) => {
	try {
		let payload = {
			sliderPath: req.body.sliderPath,
			image: [req.body.image],
		};
		let sliderImages = new sliderModel(payload);
		await sliderImages.save();
		return res
			.status(200)
			.json({ success: true, msg: CREATE_SUCCESS, data: sliderImages });
	} catch (error) {
		return res.status(CREATE_FAILED).send({
			success: false,
			msg: error.message || CREATE_FAILED,
			data: [],
		});
	}
};

const getSliderImages = async (req, res) => {
	try {
		let getImages = await sliderService.findAllQuery({ deletedAt: null });
		return res
			.status(200)
			.json({ success: true, msg: UPDATE_SUCCESS, data: getImages });
	} catch (error) {
		return res.status(CREATE_FAILED).send({
			success: false,
			msg: error.message || GET_FAILED,
			data: [],
		});
	}
};
const updateSliderImages = async (req, res) => {
	try {
		const imageId = req.query.id;
		const payload = {
			sliderPath: req.body.sliderPath,
			image: [req.body.image],
		};
		await sliderService.updateOneQuery({ _id: imageId }, { ...payload });
		return res.status(200).json({ success: true, msg: GET_SUCCESS, data: [] });
	} catch (error) {
		return res.status(UPDATE_FAILED).send({
			success: false,
			msg: error.message || GET_FAILED,
			data: [],
		});
	}
};

export default {
	createSliderImages,
	getSliderImages,
	updateSliderImages,
};
