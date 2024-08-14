import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import { CreateFoodFolioType, FoodFolioType } from '@toxictoast/azkaban-sdk';
import { foodfolioTypeEndpoint } from '../../../../../config/endpoints';

export const typeApi = createApi({
	reducerPath: 'typeApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchTypes'],
	endpoints: (builder) => ({
		fetchTypes: builder.query<Array<FoodFolioType>, void>({
			query: () => ({
				url: foodfolioTypeEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchTypes'],
		}),

		createType: builder.mutation<void, CreateFoodFolioType>({
			query: (data) => ({
				url: foodfolioTypeEndpoint,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['FetchTypes'],
		}),
	}),
});

export const { useLazyFetchTypesQuery, useCreateTypeMutation } = typeApi;
