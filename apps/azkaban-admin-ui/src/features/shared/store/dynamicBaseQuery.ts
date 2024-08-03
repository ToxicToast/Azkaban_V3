import {
	BaseQueryApi,
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Either } from '@toxictoast/azkaban-base-types';
import { RootState } from './store';

export const dynamicBaseQuery: BaseQueryFn<
	Either<string, FetchArgs>,
	unknown,
	FetchBaseQueryError
> = async (
	args: Either<string, FetchArgs>,
	WebApi: BaseQueryApi,
	extraOptions: object,
) => {
	const rootState = WebApi.getState() as RootState;
	const baseUrl = rootState.config.baseUrl ?? '';
	const token = rootState.auth.auth.token ?? null;
	const rawBaseQuery = fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers: Headers) => {
			if (token !== null) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	});
	return rawBaseQuery(args, WebApi, extraOptions);
};
