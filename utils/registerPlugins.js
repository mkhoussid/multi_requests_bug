import fastifyFormBody from '@fastify/formbody';
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
};

export default registerPlugins;
