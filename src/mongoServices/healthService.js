import { healthModel } from '../models';

const RemoveDetail = (id) => {
	const res = healthModel.updateOne(
		{ _id: id },
		{ isEnabled: false, deletedAt: new Date(), deletedBy: id },
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
	const data = await healthModel
		.find(whereClause)
		.skip(page > 0 ? +limit * (+page - 1) : 0)
		.limit(+limit || 20)
		.sort(sort)
		.populate({
			path: 'permissions',
			model: 'admin_Permissions',
		});
	const totalCount = await healthModel.find(whereClause).countDocuments();
	return { data, totalCount };
};
const find = (id) => {
	const res = healthModel.findOne({
		_id: id,
		isEnabled: true,
	});
	return res;
};
const update = (id, data) => {
	const res = healthModel.findByIdAndUpdate(
		{ _id: id },
		{ ...data },
		{ new: true, isEnabled: true },
	);
	return res;
};
const RemoveImage = (id) => {
	const res = healthModel.remove(
		{ _id: id },

	);
	return res;
};


export default {
	RemoveDetail,
	findAllQuery,
	find,
	update,
	RemoveImage

};
