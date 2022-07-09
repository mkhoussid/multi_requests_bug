import fastify from 'fastify';
import fs from 'fs';
import { listenHandler } from './utils/handlers';
import { errorHandler, errorMatrix, registerPlugins } from './utils';
import registerRoutes from './utils/handlers/registerRoutes';
import logEvent from './logs';

const start = async () => {
	try {
		global.__rootdir = __dirname;

		const app = fastify({ trustProxy: true });

		registerRoutes({ app });

		registerPlugins({ app });

		await app.after();

		app.addHook('onResponse', (request, reply, done) => {
			const isError = !/^2/.test(reply.statusCode);

			logEvent({
				level: isError ? 'error' : 'info',
				statusCode: reply.statusCode,
				message: `Request ${isError ? 'failed' : 'succeeded'}`,
			})(request, reply, done);

			done();
		});

		await app.ready((err) => {
			if (err) throw err;

			app.listen(5000, '::', listenHandler);
		});
	} catch (err) {
		errorHandler({ err, level: errorMatrix.LEVELS.ERROR, functionName: 'start' });

		console.log('err', err);
	}
};

start();
