import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
// axios.defaults.headers['user-locale'] = window.navigator.language;
import { getCancelToken } from './utils';

export * from './utils';

export enum EMethodTypes {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
}

type TParams = AxiosRequestConfig['params'];

type TBody = AxiosRequestConfig['data'];

type THeaders = AxiosRequestConfig['headers'];

type TTimeout = AxiosRequestConfig['timeout'];

type TOnUploadProgress = AxiosRequestConfig['onUploadProgress'];

export type TRequest = {
	url: string;
	method?: EMethodTypes;
	params?: TParams;
	body?: TBody;
	timeout?: TTimeout;
	headers?: THeaders;
	onUploadProgress?: TOnUploadProgress;
	baseURL?: string;
	responseType?: AxiosRequestConfig['responseType'];
	withCredentials?: AxiosRequestConfig['withCredentials'];
};

export type TResult<Result> = Result & Record<string, unknown>;

export const httpClient = async <Result>({
	url,
	method = EMethodTypes.GET,
	params = {},
	body = {},
	timeout = 15000,
	headers = {
		'content-type': 'application/json',
	},
	onUploadProgress = () => undefined,
	baseURL = 'http://localhost:5000',
	responseType,
	withCredentials = true,
}: TRequest): Promise<AxiosResponse<TResult<Result>>['data']> => {
	const cancelTokenSource = getCancelToken();

	// for connection timeout
	setTimeout(() => {
		cancelTokenSource.cancel();
	}, timeout);

	return (
		await axios({
			url,
			method,
			params,
			// for response timeout
			timeout,
			cancelToken: cancelTokenSource.token,
			data: body,
			headers: {
				...headers,
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			},
			baseURL,
			onUploadProgress,
			withCredentials,
			responseType,
		})
	).data;
};
