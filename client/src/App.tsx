import React from 'react';
import { AdminRoot } from 'src/features/admin/pages';
import { Routes, Route } from 'react-router-dom';
import { Redirect } from './router';

const App = React.memo(() => {
	return (
		<Routes>
			<Route path="/">
				<Route path="/admin/:sessionId" element={<AdminRoot />} />
				<Route path="*" element={<Redirect to={'/admin/blah'} />} />
			</Route>
		</Routes>
	);
});

export default App;
