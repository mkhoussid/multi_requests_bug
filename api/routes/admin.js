import logEvent from '../../logs';
import { verifyAdminSessionId } from '../../middleware';
import controllers from '../controllers';

const routes = [
	{
		method: 'POST',
		url: '/api/admin/auth',
		onRequest: [logEvent(), verifyAdminSessionId],
		// uncomment below line to get rid of issue
		// onRequest: logEvent({ onAfterLog: verifyAdminSessionId }),
		handler: controllers.adminController.auth,
	},
];

export default routes;
