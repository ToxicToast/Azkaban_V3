import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../dynamicBaseQuery';
import { User } from '@toxictoast/azkaban-sdk';
import { userEndpoint } from '../../../../config/endpoints';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['GetUserList'],
	endpoints: (builder) => ({
		fetchUserList: builder.query<Array<User>, void>({
			query: () => ({
				url: userEndpoint,
				method: 'GET',
			}),
			providesTags: ['GetUserList'],
		}),
	}),
});

export const { useLazyFetchUserListQuery } = userApi;
