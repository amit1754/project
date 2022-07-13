import { settingModel } from '../models';

const removeSetting = (id) => {
	const res = settingModel.updateOne(
		{ _id: id },
		{ isEnabled: false, deletedAt: new Date(), deletedBy: id },
	);
	return res;
};
const findby = (id) => {
	const res = settingModel.findOne({
		_id: id,
		isEnabled: true,
	});
	return res;
};
const updateOne = (id, data) => {
	const res = settingModel.findByIdAndUpdate(
		{ _id: id },
		{ ...data },
		{ new: true, isEnabled: true },
	);
	return res;
};
export default {
	removeSetting,
	findby,
	updateOne,
};
