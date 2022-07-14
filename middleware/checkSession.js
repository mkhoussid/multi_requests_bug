const checkSession = (hook) => (request, reply, done) => {
	const user = user;

	if (hook === 'onRequest') {
		console.log('user is undefined here --> ', user);
	} else {
		console.log('but here, user is undefined --> ', user);
	}

	done();
};

export default checkSession;
