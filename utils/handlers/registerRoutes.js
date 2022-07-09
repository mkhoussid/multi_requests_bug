import routes from '../../api/routes';

const registerRoutes = ({ app }) => {
	routes.forEach((route) => {
		app.route(route);
	});
};

export default registerRoutes;
