import * as React from 'react';
import styled from '@emotion/styled';
import { EMethodTypes, httpClient } from 'src/core/services/httpClient';

const Root = React.memo(() => {
	const [sessionSet, setSessionSet] = React.useState(false);

	const [value, setValue] = React.useState('some_value');

	const handleChange = React.useCallback(({ target: { value } }) => {
		setValue(value);
	}, []);

	const handleSubmit = React.useCallback(async () => {
		await httpClient({
			url: '/api/core/auth',
			method: EMethodTypes.POST,
			body: JSON.stringify({ value }),
		});

		setSessionSet(true);
	}, [value]);

	const handleCheckSession = React.useCallback(async () => {
		await httpClient({
			url: '/api/core/check-session',
		});
	}, []);

	return (
		<Container>
			<Form>
				<input value={value} onChange={handleChange} placeholder={'Enter email'} />
				<ButtonContainer>
					<button onClick={handleSubmit}>Submit</button>
					{sessionSet && <button onClick={handleCheckSession}>Check session</button>}
				</ButtonContainer>
			</Form>
		</Container>
	);
});

export default Root;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width 100%;
`;

const Form = styled.div`
	width: fit-content;
	height: fit-content;
	box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
	padding: 3rem;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
`;
