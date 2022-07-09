const listenHandler = (err, address) => {
	if (err) throw err;

	console.log(`Server listening at ${address}`);
};

export default listenHandler;
