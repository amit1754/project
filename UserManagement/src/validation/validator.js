import Joi from 'joi';

import { validateRequest } from '../middleware';


function permissionsValidator(req, res, next) {
	const schema = Joi.object({
		path: Joi.string().required(),
		displayName: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}
function roleValidator(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		permissions: Joi.array().required(),
	});
	validateRequest(req, res, next, schema);
}

function adminUserValidation(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		role: Joi.string().required(),
		profileImage: Joi.string().optional(),
	});
	validateRequest(req, res, next, schema);
}
export default {

	permissionsValidator,
	roleValidator,
	adminUserValidation,
	
};
