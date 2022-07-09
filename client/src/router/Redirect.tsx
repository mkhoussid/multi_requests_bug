import * as React from 'react';
import { Navigate } from 'react-router-dom';

export type TRedirect = {
	to: string;
	replace?: boolean;
	state?: Record<string, never | string> | undefined;
};
const Redirect = React.memo(({ to, replace = false, state }: TRedirect) => {
	return <Navigate to={to} replace={replace} state={state} />;
});

export default Redirect;
