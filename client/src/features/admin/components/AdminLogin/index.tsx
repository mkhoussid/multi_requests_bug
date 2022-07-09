import * as React from 'react';
import styled from '@emotion/styled';
import { EMethodTypes, httpClient } from 'src/core/services/httpClient';

const AdminLogin = React.memo(() => {
	const [mode] = React.useState<'email' | 'key'>('email');
	const [value, setValue] = React.useState('');

	const handleChange = React.useCallback(({ target: { value } }) => {
		setValue(value);
	}, []);

	const handleSubmit = React.useCallback(async () => {
		await httpClient({
			url: '/api/admin/auth',
			method: EMethodTypes.POST,
			body: JSON.stringify({ mode, value }),
		});
	}, [value, mode]);

	return (
		<Container>
			<Form>
				<input value={value} onChange={handleChange} placeholder={mode === 'email' ? 'Enter email...' : 'Enter key..'} />
				<button onClick={handleSubmit}>Submit</button>
			</Form>
		</Container>
	);
});

export default AdminLogin;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width 100%;
`;

const Form = styled.div`
	width: fit-content;
	height: fit-content;
	box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
	padding: 3rem;
	border-radius: 0.5rem;
`;
