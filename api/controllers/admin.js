const adminController = {
	auth: async (request, reply) => {
		console.log('HIT TWICE');
		const { rows } = await request.db().client.query(`SELECT * FROM multi_requests.user WHERE email = $1`, [mode]);

		return reply.send({ rows });
	},
};

export default adminController;
