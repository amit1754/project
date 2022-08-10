import cron from 'node-cron';
import { monthlyTimeSlotModel } from '../../models';

require('dotenv').config({ path: 'src/config/.env' });

const data = cron.schedule('0 2 * * *', async () => {
	try {
		let newDate = new Date();
		newDate.setDate(newDate.getDay() - 1);
		newDate.setUTCHours(23, 59, 59, 999);
		let newDate1 = new Date();
		newDate1.setDate(newDate.getDay() - 1);
		newDate1.setUTCHours(0, 0, 0, 0);
		let filter = {
			date: {
				$lte: newDate.toISOString(),
				$gte: newDate1.toISOString(),
			},
		};
		let oldTimeSlot = await monthlyTimeSlotModel.find(filter);
		let ids = oldTimeSlot.map((x) => x._id);
		await monthlyTimeSlotModel.deleteMany({ _id: { $in: ids } });
		return true;
	} catch (err) {
		return false;
	}
});

export default data;
