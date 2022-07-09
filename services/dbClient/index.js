import fastifyPlugin from 'fastify-plugin';
import { Client } from 'pg';
import { errorHandler, errorMatrix } from '../../utils';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_SERVICE,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DB,
});
const dbConnector = async (app, b, done) => {
	try {
		console.log('Postgres connecting...');

		await client.connect();

		console.log('Postgres connected');

		app.decorateRequest('db', function () {
			return { client };
		});

		await client.query(`CREATE SCHEMA IF NOT EXISTS multi_requests`);
		await client.query(`
			CREATE TABLE IF NOT EXISTS multi_requests.user (
				id serial PRIMARY KEY,
				email VARCHAR (255) UNIQUE NOT NULL,
				password VARCHAR (255) NOT NULL,
				created_at TIMESTAMP NOT NULL,
				updated_at TIMESTAMP NOT NULL
			)
		`);

		done();
	} catch (err) {
		errorHandler({ err, functionName: 'dbConnector', level: errorMatrix.LEVELS.ERROR });
	}
};

fastifyPlugin(dbConnector);

export default dbConnector;
