import fastify from 'fastify';
import { listenHandler } from './utils/handlers';
import { registerPlugins } from './utils';
import registerRoutes from './utils/handlers/registerRoutes';

const start = async () => {
	try {
		const app = fastify({ trustProxy: true });

		registerRoutes({ app });
		registerPlugins({ app });

		await app.after();

		await app.ready((err) => {
			if (err) throw err;

			app.listen({ path: '::', port: 5000 }, listenHandler);
		});
	} catch (err) {
		console.log('err in start', err);
	}
};

start();
