export default {
	SERVER: {
		PORT: 5001,
		PRODUCTION: false,
		LOG_PATH: 'logs',
		FRONTEND_URL: 'http://localhost:3000/',
	},
	DATABASE: {
<<<<<<< HEAD
		MONGO_URI:
			'mongodb://wisecaller_admin:Dealing2021@54.196.46.51:27017/database?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
=======
		MONGO_URI: 'mongodb://wisecaller_admin:Dealing2021@54.196.46.51:27017/database?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
>>>>>>> d601b48575609898d7d6561be1ff2af253ae2b00
		MONGO_DB_NAME: 'database',
	},

	JWT: {
		SECRET: 'SECRET',
		EXPIRY: '7d',
		FORGET_TOKEN_EXPIRY: '10m',
		ACCOUNT_ACTIVATION: 'SECRET',
	},
	SENDGRID: {
		EMAIL: 'tushar.savaliya@centillionsofttech.com',
		API_KEY:
			'SG.GBWde9CwRHuk6dhzMWTSCQ.vuWUJAaa7VCgg9Ccr7fPg4d9HgBSWAVKQhdKj4e8WvM',
	},
};
