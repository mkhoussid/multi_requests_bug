import registerRoutes from './registerRoutes';

const afterHandler =
	({ app }) =>
	() => {
		registerRoutes({ app });
	};

export default afterHandler;
