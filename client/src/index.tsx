import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Entry from './Entry';

ReactDOM.render(
	<Router>
		<Entry />
	</Router>,
	document.getElementById('root'),
);
