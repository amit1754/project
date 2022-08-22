import { chatRoomModel } from '../models';
const findAllQuery = async (query) => {
	let { search, _id, limit, page, sortField, sortValue, email } = query;
	let sort = {};
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
			$or: [{ email: search }, { mobileNumber: search }, { name: search }],
		};
	}
	if (_id) {
		whereClause = { ...whereClause, _id };
	}
	if (email) {
		whereClause = { ...whereClause, email };
	}
	const data = await chatRoomModel
		.find(whereClause)
		.skip(page > 0 ? +limit * (+page - 1) : 0)
		.limit(+limit || 20)
		.sort(sort);

	return { data };
};

const updateOneQuery = async (filter, update, projection) => {
	console.log('update', update);
	console.log('filter', filter);
	let options = { new: true, fields: { ...projection } };

	const result = await chatRoomModel.findOneAndUpdate(filter, update, options);

	return result;
};

export default {
	findAllQuery,
	updateOneQuery,
};
