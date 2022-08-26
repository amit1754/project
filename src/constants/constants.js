export default {
	ROLE: {
		SUPER_USER: 'SUPER_USER',
		DEVELOPER: 'DEVELOPER',
		ADMIN: 'ADMIN',
	},
	STATUS_CODE: {
		SUCCESS: 200,
		FAILED: 500,
		UNAUTHORIZED: 401,
	},
	MAIL_SUBJECT: {
		REGISTER_MAIL: 'Curific Application Registration',
		FORGET_PASSWORD_EMAIL: 'Curific Application Forget Password',
	},
	MAIL_STATUS: {
		SUCCESS: 'SUCCESS',
		FAILED: 'FAILED',
	},
	USER_TYPE: {
		DR: 'DR',
		CUSTOMER: 'CUSTOMER',
	},

	RESPONSE_MESSAGE: {
		INVALID_OBJECTID: 'ID IS INVALID',
		FAILED_RESPONSE: 'failed',

		PERMISSIONS: {
			CREATE_SUCCESS: 'Permissions created successfully',
			CREATE_FAILED: 'Permissions creating failed',
			UPDATE_SUCCESS: 'Permissions update successfully',
			UPDATE_FAILED: 'Permissions updating failed',
			GET_SUCCESS: 'Permissions get successfully',
			GET_FAILED: 'Permissions is not available',
			DELETE_SUCCESS: 'Permissions delete successfully',
			DELETE_FAILED: 'Permissions deletion failed',
			NOT_PERMISSIONS: 'Permissions is not available',
			ALREADY_AVAILABLE: 'Permissions is already available',
		},
		ROLE: {
			CREATE_SUCCESS: 'Role created successfully',
			CREATE_FAILED: 'Role creating failed',
			UPDATE_SUCCESS: 'Role update successfully',
			UPDATE_FAILED: 'Role updating failed',
			GET_SUCCESS: 'Role get successfully',
			GET_FAILED: 'Role is not available',
			DELETE_SUCCESS: 'Role delete successfully',
			DELETE_FAILED: 'Role deletion failed',
			NOT_ROLE: 'Role is not available',
			USER_AVAILABLE:
				'Many user has available with this role. please remove user from the role and then after deletion',
		},
		ADMIN_USER: {
			CREATE_SUCCESS: 'Admin user created successfully',
			CREATE_FAILED: 'Admin user creating failed',
			UPDATE_SUCCESS: 'Admin user update successfully',
			UPDATE_FAILED: 'Admin user updating failed',
			GET_SUCCESS: 'Admin user get successfully',
			GET_FAILED: 'Admin user is not available',
			DELETE_SUCCESS: 'Admin user delete successfully',
			DELETE_FAILED: 'Admin user deletion failed',
			NOT_ADMIN_USER: 'Admin user is not available',
			USER_AVAILABLE: ' User is already registered',
			USER_NOT_AVAILABLE: 'Admin user is not available',
			LOGIN_SUSPEND: 'user is suspending',
			PASSWORD_CHANGED: 'Password is changed successfully',
			PASSWORD_NOT_CHANGED: 'Password is not changed',
		},
		CUSTOMER_MESSAGE: {
			CREATE_SUCCESS: 'User created successfully',
			CREATE_FAILED: 'User creating failed',
			UPDATE_SUCCESS: 'User update successfully',
			UPDATE_FAILED: 'User updating failed',
			GET_SUCCESS: 'User get successfully',
			GET_FAILED: 'User is not available',
			DELETE_SUCCESS: 'User delete successfully',
			DELETE_FAILED: 'User deletion failed',
			NOT_CUSTOMER_USER: 'User is not available',
			USER_AVAILABLE: 'User is already registered',
			USER_NOT_AVAILABLE: 'User is not available',
			LOGIN_SUSPEND: 'user is suspending',
			PASSWORD_CHANGED: 'Password is changed successfully',
			PASSWORD_NOT_CHANGED: 'Password is not changed',
			VERIFY_OTP: 'Otp is send into email',
			VERIFY_FAILED: 'otp is wrong',
		},
		AUTH_MIDDLEWARE: {
			UNAUTHORIZED: 'You can not access this resource',
			TOKEN_NOTFOUND: 'Access denied. No token provided',
			TOKEN_INVALID: 'Invalid Token',
			USER_DISABLE: 'User disabled',
			USER_NOT_FOUND: 'No User Found With That Token',
			SESSION_EXPIRY: 'Session ended',
		},
		DR_USER: {
			CREATE_SUCCESS: 'Doctor created successfully',
			CREATE_FAILED: 'Doctor creating failed',
			UPDATE_SUCCESS: 'Doctor update successfully',
			UPDATE_FAILED: 'Doctor updating failed',
			GET_SUCCESS: 'Doctor get successfully',
			GET_FAILED: 'Doctor is not available',
			DELETE_SUCCESS: 'Doctor delete successfully',
			DELETE_FAILED: 'Doctor deletion failed',
			VERIFY_OTP: 'Otp is send into email',
			VERIFY_FAILED: 'otp is wrong',
		},
		SPECIALITY: {
			CREATE_SUCCESS: 'Speciality created successfully',
			CREATE_FAILED: 'Speciality creating failed',
			UPDATE_SUCCESS: 'Speciality update successfully',
			UPDATE_FAILED: 'Speciality updating failed',
			GET_SUCCESS: 'Speciality get successfully',
			GET_FAILED: 'Speciality is not available',
			DELETE_SUCCESS: 'Speciality delete successfully',
			DELETE_FAILED: 'Speciality deletion failed',
			ASSIGN_SUCCESS: 'Speciality assign successfully',
			ASSIGN_FAILED: 'Speciality assign failed',
		},
		CONSULT: {
			CREATE_SUCCESS: 'Consult created successfully',
			CREATE_FAILED: 'Consult creating failed',
			UPDATE_SUCCESS: 'Consult update successfully',
			UPDATE_FAILED: 'Consult updating failed',
			GET_SUCCESS: 'Consult get successfully',
			GET_FAILED: 'Consult is not available',
			DELETE_SUCCESS: 'Consult delete successfully',
			DELETE_FAILED: 'Consult deletion failed',
			ALREADY_AVAILABLE: 'Consult is already available',
		},
		LANGUAGE: {
			CREATE_SUCCESS: 'Language created successfully',
			CREATE_FAILED: 'Language creating failed',
			UPDATE_SUCCESS: 'Language update successfully',
			UPDATE_FAILED: 'Language updating failed',
			GET_SUCCESS: 'Language get successfully',
			GET_FAILED: 'Language is not available',
			DELETE_SUCCESS: 'Language delete successfully',
			DELETE_FAILED: 'Language deletion failed',
			ALREADY_AVAILABLE: 'Language is already available',
		},
		NOTIFICTIONTYPE: {
			CREATE_SUCCESS: 'Notification Type created successfully',
			CREATE_FAILED: 'Notification Type creating failed',
			UPDATE_SUCCESS: 'Notification Type update successfully',
			UPDATE_FAILED: 'Notification Type updating failed',
			GET_SUCCESS: 'Notification Type get successfully',
			GET_FAILED: 'Notification Type is not available',
			DELETE_SUCCESS: 'Notification Type delete successfully',
			DELETE_FAILED: 'Notification Type deletion failed',
		},
		NOTIFICATION: {
			CREATE_SUCCESS: 'Notification created successfully',
			CREATE_FAILED: 'Notification creating failed',
			UPDATE_SUCCESS: 'Notification update successfully',
			UPDATE_FAILED: 'Notification updating failed',
			GET_SUCCESS: 'Notification get successfully',
			GET_FAILED: 'Notification is not available',
			DELETE_SUCCESS: 'Notification delete successfully',
			DELETE_FAILED: 'Notification deletion failed',
		},
		DEVICE: {
			CREATE_SUCCESS: 'Device created successfully',
			CREATE_FAILED: 'Device creating failed',
			UPDATE_SUCCESS: 'Device update successfully',
			UPDATE_FAILED: 'Device updating failed',
			GET_SUCCESS: 'Device get successfully',
			GET_FAILED: 'Device is not available',
			DELETE_SUCCESS: 'Device delete successfully',
			DELETE_FAILED: 'Device deletion failed',
			DELETE_ALREADY_AVAILABLE: 'Device Already available',
		},
		TIME_SLOT: {
			CREATE_SUCCESS: 'Time Slot created successfully',
			CREATE_FAILED: 'Time Slot creating failed',
			UPDATE_SUCCESS: 'Time Slot update successfully',
			UPDATE_FAILED: 'Time Slot updating failed',
			GET_SUCCESS: 'Time Slot get successfully',
			GET_FAILED: 'Time Slot is not available',
			DELETE_SUCCESS: 'Time Slot delete successfully',
			DELETE_FAILED: 'Time Slot deletion failed',
			ASSIGN_SUCCESS: 'Time Slot assign successfully',
			ASSIGN_FAILED: 'Time Slot assign failed',
		},
		HEALTH_ARTICLE: {
			CREATE_SUCCESS: 'Health Article created successfully',
			CREATE_FAILED: 'Health Article creating failed',
			UPDATE_SUCCESS: 'Health Article update successfully',
			UPDATE_FAILED: 'Health Article updating failed',
			GET_SUCCESS: 'Health Article get successfully',
			GET_FAILED: 'Health Article is not available',
			DELETE_SUCCESS: 'Health Article delete successfully',
			DELETE_FAILED: 'Health Article deletion failed',
			NOT_AVAILABLE: 'Health Article is not available',
		},
		SETTING: {
			CREATE_SUCCESS: 'Setting created successfully',
			CREATE_FAILED: 'Setting creating failed',
			UPDATE_SUCCESS: 'Setting update successfully',
			UPDATE_FAILED: 'Setting updating failed',
			GET_SUCCESS: 'Setting get successfully',
			GET_FAILED: 'Setting is not available',
			DELETE_SUCCESS: 'Setting delete successfully',
			DELETE_FAILED: 'Setting deletion failed',
			NAME_NOT_AVAILABLE: 'Setting name is already available',
		},
		PACKAGE: {
			CREATE_SUCCESS: 'Package created successfully',
			CREATE_FAILED: 'Package creating failed',
			UPDATE_SUCCESS: 'Package update successfully',
			UPDATE_FAILED: 'Package updating failed',
			GET_SUCCESS: 'Package get successfully',
			GET_FAILED: 'Package is not available',
			DELETE_SUCCESS: 'Package delete successfully',
			DELETE_FAILED: 'Package deletion failed',
			PACKAGE_ALREADY_EXISTS: 'Package  already exists',
		},
		DASHBOARD: {
			GET_SUCCESS: 'data get successfully',
		},
		FAQS: {
			CREATE_SUCCESS: 'Faq created successfully',
			CREATE_FAILED: 'Faq creating failed',
			UPDATE_SUCCESS: 'Faq update successfully',
			UPDATE_FAILED: 'Faq updating failed',
			GET_SUCCESS: 'Faq get successfully',
			GET_FAILED: 'Faq is not available',
			DELETE_SUCCESS: 'Faq delete successfully',
			DELETE_FAILED: 'Faq deletion failed',
		},
		APPOINTMENT: {
			CREATE_SUCCESS: 'Appointment created successfully',
			CREATE_FAILED: 'Appointment creating failed',
			UPDATE_SUCCESS: 'Appointment update successfully',
			UPDATE_FAILED: 'Appointment updating failed',
			GET_SUCCESS: 'Appointment get successfully',
			GET_FAILED: 'Appointment is not available',
			DELETE_SUCCESS: 'Appointment delete successfully',
			DELETE_FAILED: 'Appointment deletion failed',
		},

		SUBSCRIPTION: {
			CREATE_SUCCESS: 'Subscription created successfully',
			CREATE_FAILED: 'Subscription creation failed',
		},
		PAYMENT: {
			CREATE_SUCCESS: 'Payment created successfully',
			CREATE_FAILED: 'Payment creation failed',
			UPDATE_SUCCESS: 'Payment update successfully',
			UPDATE_FAILED: 'Payment update failed',
			GET_SUCCESS: 'Payment get successfully',
			GET_FAILED: 'Payment get failed',
			DELETE_SUCCESS: 'Payment delete successfully',
			DELETE_FAILED: 'Payment deletion failed',
			PAYMENTNOTFOUND: 'Payment not found',
		},

		FEEDBACK: {
			CREATE_SUCCESS: 'Feedback created successfully',
			CREATE_FAILED: 'Feedback creating failed',
			UPDATE_SUCCESS: 'Feedback update successfully',
			UPDATE_FAILED: 'Feedback updating failed',
			GET_SUCCESS: 'Feedback get successfully',
			GET_FAILED: 'Feedback is not available',
			DELETE_SUCCESS: 'Feedback delete successfully',
			DELETE_FAILED: 'Feedback deletion failed',
		},

		ASSESSMENT: {
			CREATE_SUCCESS: 'Assessment created successfully',
			CREATE_FAILED: 'Assessment creating failed',
			UPDATE_SUCCESS: 'Assessment update successfully',
			UPDATE_FAILED: 'Assessment updating failed',
			GET_SUCCESS: 'Assessment get successfully',
			GET_FAILED: 'Assessment is not available',
			DELETE_SUCCESS: 'Assessment delete successfully',
			DELETE_FAILED: 'Assessment deletion failed',
		},
		LIVEEVENT: {
			CREATE_SUCCESS: 'Live Event created successfully',
			CREATE_FAILED: 'Live Event creating failed',

			UPDATE_SUCCESS: 'Live Event update successfully',
			UPDATE_FAILED: 'Live Event updating failed',
			GET_SUCCESS: 'Live Event get successfully',
			GET_FAILED: 'Live Event is not available',
			DELETE_SUCCESS: 'Live Event delete successfully',

			DELETE_FAILED: 'Live Event deletion failed',
			NOT_AVAILABLE: 'Live Event is not available',
		},
		CHATROOM: {
			CREATE_SUCCESS: 'Chat Room created successfully',
			CREATE_FAILED: 'Chat Room creating failed',
			DRNOTFOUND: 'Doctor not found',
			PATIENTNOTFOUND: 'Patient not found',
			APPOINTMENTNOTFOUND: 'Appointment not found',
			ROOMNOTFOUND: 'Room not found',
			SEND_SUCCESS: 'Message sent successfully',
			SEND_FAILED: 'Message sending failed',
		},
		THERAPY: {
			CREATE_SUCCESS: 'Therapy  created successfully',
			CREATE_FAILED: 'Therapy  creating failed',
			GET_FAILED: 'Therapy  Get failed',
			GET_SUCCESS: 'Therapy  Get failed',
			UPDATE_SUCCESS: 'Therapy  Update failed',
			UPDATE_FAILED: 'Therapy  Update failed',
			DELETE_SUCCESS: 'Therapy  Delete failed',
			DELETE_FAILED: 'Therapy  Delete failed',
		},
	},
	IMAGE_DATA: {
		CREATE_SUCCESS: 'Image data created successfully',
		CREATE_FAILED: 'Image data create failed',
		UPDATE_SUCCESS: 'Image data update successfully',
		UPDATE_FAILED: 'Image data update failed',
		GET_SUCCESS: 'Image data get successfully',
		GET_FAILED: 'Image data get failed',
	},
};
