const coreController = {
	auth: async (request, reply) => {
		request.session.user = request.body.value;

		return reply.send({ rows });
	},
};

export default coreController;
