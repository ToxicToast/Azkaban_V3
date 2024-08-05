import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { foodfolioCategoryEndpoint } from '../../../../../config/endpoints';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchCategories'],
	endpoints: (builder) => ({
		fetchCategories: builder.query<Array<FoodFolioCategory>, void>({
			query: () => ({
				url: foodfolioCategoryEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchCategories'],
		}),
	}),
});

export const { useLazyFetchCategoriesQuery } = categoryApi;
