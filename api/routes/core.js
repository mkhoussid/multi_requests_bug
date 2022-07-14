import { checkSession } from '../../middleware';
import controllers from '../controllers';

const routes = [
	{
		method: 'POST',
		url: '/api/core/auth',
		handler: controllers.coreController.auth,
	},
	{
		method: 'POST',
		url: '/api/core/check-session',
		onRequest: [checkSession({ hook: 'onRequest' })],
		preHandler: [checkSession({ hook: 'preHandler' })],
		handler: controllers.coreController.auth,
	},
];

export default routes;
