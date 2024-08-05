import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../dynamicBaseQuery';
import { Auth } from '@toxictoast/azkaban-sdk';
import { authLoginWithCookieEndpoint } from '../../../../config/endpoints';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: dynamicBaseQuery,
	endpoints: (builder) => ({
		loginUser: builder.mutation<
			Auth,
			{ username: string; password: string }
		>({
			query: (data) => ({
				url: authLoginWithCookieEndpoint,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useLoginUserMutation } = authApi;
