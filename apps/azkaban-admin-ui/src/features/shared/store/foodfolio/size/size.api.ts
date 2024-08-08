import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import { FoodFolioLocation } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { foodfolioSizeEndpoint } from '../../../../../config/endpoints';

export const sizeApi = createApi({
	reducerPath: 'sizeApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchSizes'],
	endpoints: (builder) => ({
		fetchSizes: builder.query<Array<FoodFolioLocation>, void>({
			query: () => ({
				url: foodfolioSizeEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchSizes'],
		}),

		createSize: builder.mutation<
			void,
			{ title: string; parent_id: Nullable<string>; freezer: string }
		>({
			query: (data) => ({
				url: foodfolioSizeEndpoint,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['FetchSizes'],
		}),
	}),
});

export const { useLazyFetchSizesQuery, useCreateSizeMutation } = sizeApi;
