export default {
	SERVER: {
		PORT: 5001,
		PRODUCTION: false,
		LOG_PATH: 'logs',
		FRONTEND_URL: 'http://localhost:3000/',
	},
	DATABASE: {
		MONGO_URI:
			'mongodb://wisecaller_admin:Dealing2021@54.196.46.51:27017/database?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
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
