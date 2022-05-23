import sgMail from '@sendgrid/mail';
sgMail.setApiKey(
	'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',
);
// import { mailLoggerModel } from '../models';
import { CONSTANTS } from '../constants';
const {
	MAIL_STATUS: { FAILED },
} = CONSTANTS;
const sendMail = async (to, from, subject, html) => {
	try {
		const sendMailObj = {
			to,
			from,
			subject,
			html,
		};
		const sendEmail = await sgMail.send(sendMailObj);

		return sendEmail;
	} catch (error) {
		if (error.response) {
			return error.response.body;
		}
	}
};

export default sendMail;
