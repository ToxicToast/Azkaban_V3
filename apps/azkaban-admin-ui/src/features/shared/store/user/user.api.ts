import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../dynamicBaseQuery';
import { User } from '@toxictoast/azkaban-sdk';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['GetUserList'],
	endpoints: (builder) => ({
		fetchUserList: builder.query<Array<User>, void>({
			query: () => ({
				url: '/user',
				method: 'GET',
			}),
			providesTags: ['GetUserList'],
		}),
	}),
});

export const { useLazyFetchUserListQuery } = userApi;
