import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { foodfolioCategoryEndpoint } from '../../../../../config/endpoints';
import { Nullable } from '@toxictoast/azkaban-base-types';

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

		createCategory: builder.mutation<
			void,
			{ title: string; parent_id: Nullable<string> }
		>({
			query: (data) => ({
				url: foodfolioCategoryEndpoint,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['FetchCategories'],
		}),
	}),
});

export const { useLazyFetchCategoriesQuery, useCreateCategoryMutation } =
	categoryApi;
