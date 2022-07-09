import { errorHandler, errorMatrix } from '../utils';

const verifyAdminSessionId = async (request, reply, done) => {
	try {
		done();
	} catch (err) {
		errorHandler({ err, functionName: 'verifyAdminSessionId', level: errorMatrix.LEVELS.ERROR });
	}
};

export default verifyAdminSessionId;
