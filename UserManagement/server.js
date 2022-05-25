import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import ip from 'ip';
import compression from 'compression';
import serveIndex from 'serve-index';
import { greenBright, cyanBright } from 'chalk';
import './src/config/dbConnection';
import routes from './src/routes';
import { ENV } from './src/constants';

// import roleSeed from './src/dbSeed/Role';
// import userSeed from './src/dbSeed/Users';
// import PermissionsSeed from './src/dbSeed/Permissions';
require('dotenv').config({ path: 'src/config/.env' });
const {
	SERVER: { PORT },
} = ENV;
const server = express();

// anonymous function for seed

// (async () => {
// 	await PermissionsSeed();
// 	// role for super user seed
// 	await roleSeed();

// 	// // seed for super user
// 	await userSeed();
// })();

const HOST = process.env.HOST || 'localhost';
const FILE_PATH = process.env.FILE_PATH || 'uploads';

/** Middleware */

/** Parse Req.body */
server.use(json());
server.use(urlencoded({ extended: true }));
/** CORS */

var corsOptions = {
	origin: 'http://localhost:3000',
};
server.use(cors(corsOptions));
/** API LOG */
server.use(morgan('dev'));
/** XSS Attack Security */
server.use(helmet());
/** Compress Requests */
server.use(compression());
/** File Upload Static */
server.use(
	`/${FILE_PATH}`,
	express.static(FILE_PATH),
	serveIndex(FILE_PATH, { icons: true }),
);

const BASE_API_URL = `http://${HOST}:${PORT}/api/v1/`;
const NETWORK_BASE_API_URL = `http://${ip.address()}:${PORT}/api/v1/`;

server.use('/api/v1', routes);
server.use('/**', (_req, res) => {
	res.status(404).json({
		success: false,
		message: 'Not Found' + _req.baseUrl,
	});
});

server.listen(PORT || 3002, () => {
	console.info(cyanBright('API Running at'));
	console.info(cyanBright(`${greenBright('\tLocalhost:')} ${BASE_API_URL}`));
	console.info(cyanBright(`${greenBright('\tLAN:')} ${NETWORK_BASE_API_URL}`));
});
