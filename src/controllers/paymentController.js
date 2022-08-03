import { CONSTANTS } from '../constants';
import { appointmentService, paymentService } from '../mongoServices';
import { paymentModel } from '../models';
import { rozorPayment } from '../service';
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, FAQS },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const addPayment = async (req, res) => {
	try {
		const { body } = req;
		const { data: appointment } = await appointmentService.findAllQuery({
			_id: body.appointmentId,
		});

		if (appointment.length !== 0) {
			let filter = { paymentId: body.paymentId };
			let findPayment = await paymentService.findAllQuery(filter);
			if (findPayment.data.length !== 0) {
				throw new Error('Payment is wrong');
			} else {
				const paymentDetails = await rozorPayment(body.paymentId);
				let paymentPayload = {
					paymentId: body.paymentId,
					type: body.type,
					appointmentId: body.appointmentId,
					packageId: body.packageId,
					baseAmount: paymentDetails?.amount / 100,
					paidAmount: paymentDetails?.amount / 100,
					discountAmount: paymentDetails?.discountAmount
						? paymentDetails?.discountAmount
						: 0,
					otherDetails: paymentDetails,
				};
				let savePayload = new paymentModel(paymentPayload).save();
				if (savePayload) {
					let filter = { _id: body.appointmentId };
					let update = {
						paymentID: savePayload._id,
					};
					let updatePayload = await appointmentService.updateOneQuery(
						filter,
						update,
						{},
					);
					if (updatePayload) {
						return res.status(SUCCESS).json({
							success: true,
							message: 'Payment added successfully',
							data: [],
						});
					} else {
						throw new Error('Payment not updated');
					}
				} else {
					throw new Error('Payment not added');
				}
			}
		} else {
			throw new Error('Appointment not found');
		}
	} catch (error) {
		res.status(FAILED).json({
			status: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

export default { addPayment };
