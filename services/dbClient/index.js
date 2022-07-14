import fastifyPlugin from 'fastify-plugin';
import { Client } from 'pg';
import dotenv from 'dotenv';
import pgStore from 'connect-pg-simple';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
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

		const { rows } = await client.query(`
			SELECT EXISTS (
				SELECT FROM information_schema.tables 
				WHERE  table_schema = 'undefined_session'
				AND    table_name   = 'session'
			);
		`);

		if (!rows[0].exists) {
			await client.query(`CREATE SCHEMA IF NOT EXISTS undefined_session`);
			await client.query(`
			CREATE TABLE IF NOT EXISTS undefined_session.session (
				"sid" varchar NOT NULL COLLATE "default",
				"sess" json NOT NULL,
				"expire" timestamp(6) NOT NULL
			)
			WITH (OIDS=FALSE);
			
			ALTER TABLE undefined_session.session ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
			
			CREATE INDEX "IDX_session_expire" ON undefined_session.session ("expire");
		`);
		}

		const PgSessionStore = pgStore(fastifySession);
		const store = new PgSessionStore({
			tableName: 'session',
			schemaName: 'undefined_session',
			pool: client,
		});

		app.register(fastifyCookie);
		app.register(fastifySession, {
			secret: '1'.repeat(32).length,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				maxAge: 2592000000,
				secure: false,
			},
			expires: 1800000,
			store,
		});

		done();
	} catch (err) {
		console.log('err in dbconnect', err);
	}
};

fastifyPlugin(dbConnector);

export default dbConnector;
