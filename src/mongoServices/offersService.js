import { offersModel } from '../models';
const findAllQuery = async (query) => {
	let { search, _id, limit, page, sortField, sortValue, email, populate } =
		query;
	let sort = {},
		data;
	let whereClause = {};
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
			$or: [{ email: search }, { name: search }, { mobileNumber: search }],
		};
	}
	if (_id) {
		whereClause = { ...whereClause, _id };
	}
	if (email) {
		whereClause = { ...whereClause, email };
	}

	if (populate) {
		data = await offersModel
			.find(whereClause)
			.skip(page > 0 ? +limit * (+page - 1) : 0)
			.limit(+limit || 20)
			.sort(sort);
	} else {
		data = await offersModel
			.find(whereClause)
			.skip(page > 0 ? +limit * (+page - 1) : 0)
			.limit(+limit || 20)
			.sort(sort);
	}
	const totalCount = await offersModel.find(whereClause).countDocuments();
	return { data, totalCount };
};
const updateOneQuery = async (filter, update, projection) => {
	let options = { new: true, fields: { ...projection } };

	const data = await offersModel.findOneAndUpdate(filter, update, options);
	return data;
};
const deleteOneQuery = async (id) => {
	await offersModel.findOneAndDelete(id);
	return true;
};

export default {
	findAllQuery,
	deleteOneQuery,
	updateOneQuery,
};
