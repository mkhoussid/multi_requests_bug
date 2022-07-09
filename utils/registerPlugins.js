import fastifyFormBody from '@fastify/formbody';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import dbConnector from '../services/dbClient';

const registerPlugins = ({ app }) => {
	app.register(dbConnector);

	app.register(fastifyCors, {
		origin: 'http://localhost:3000',
		methods: ['POST', 'PUT', 'DELETE', 'GET'],
		credentials: true,
	});

	app.register(fastifyFormBody);

	// comment next line to get rid of issue
	app.register(fastifyHelmet, { contentSecurityPolicy: false });
};

export default registerPlugins;
