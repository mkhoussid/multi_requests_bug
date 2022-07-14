import React from 'react';
import { Root } from 'src/features/core/pages';
import { Routes, Route } from 'react-router-dom';
import { Redirect } from './router';

const App = React.memo(() => {
	return (
		<Routes>
			<Route path="/">
				<Route path="/" element={<Root />} />
				<Route path="*" element={<Redirect to={'/'} />} />
			</Route>
		</Routes>
	);
});

export default App;
