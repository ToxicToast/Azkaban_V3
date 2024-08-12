import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import { FoodFolioSize } from '@toxictoast/azkaban-sdk';
import { foodfolioSizeEndpoint } from '../../../../../config/endpoints';

export const sizeApi = createApi({
	reducerPath: 'sizeApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchSizes'],
	endpoints: (builder) => ({
		fetchSizes: builder.query<Array<FoodFolioSize>, void>({
			query: () => ({
				url: foodfolioSizeEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchSizes'],
		}),

		createSize: builder.mutation<void, { title: string }>({
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
