import { settingModel } from '../models';

const removeSetting = (id) => {
	const res = settingModel.updateOne(
		{ _id: id },
		{ isEnabled: false, deletedAt: new Date(), deletedBy: id },
	);
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
const findAllQuery = async (query) => {
	let { search, _id, limit, page, sortField, sortValue } = query;
	let sort = {};
	let whereClause = { deletedAt: null };
	if (sortField) {
		sort = {
			[sortField]: sortValue === 'ASC' ? 1 : -1,
		};
	} else {
		sort = {
			displayName: 1,
		};
	}
	if (search) {
		search = new RegExp(search, 'ig');
		whereClause = {
			$or: [{ deviceName: search }, { deviceType: search }],
		};
	}
	if (_id) {
		whereClause = { ...whereClause, _id };
	}
	const data = await settingModel
		.find(whereClause)
		.skip(page > 0 ? +limit * (+page - 1) : 0)
		.limit(+limit || 20)
		.sort(sort)
		.populate({
			path: 'permissions',
			model: 'admin_Permissions',
		});
	const totalCount = await settingModel.find(whereClause).countDocuments();
	return { data, totalCount };
};
const findBy = (id) => {
	const res = settingModel.findOne({
		_id: id,
		isEnabled: true,
	});
	return res;
};
const updateData = (id, data) => {
	const res = settingModel.findByIdAndUpdate(
		{ _id: id },
		{ ...data },
		{ new: true, isEnabled: true },
	);
	return res;
};
export default {
	removeSetting,
	updateOne,
	findAllQuery,
	updateData,
	findBy
};
