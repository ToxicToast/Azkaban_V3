import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import { CreateFoodFolioItem, FoodFolioItem } from '@toxictoast/azkaban-sdk';
import { foodfolioProductEndpoint } from '../../../../../config/endpoints';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchProducts'],
	endpoints: (builder) => ({
		fetchProducts: builder.query<Array<FoodFolioItem>, void>({
			query: () => ({
				url: foodfolioProductEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchProducts'],
		}),

		createProduct: builder.mutation<void, CreateFoodFolioItem>({
			query: (data) => ({
				url: foodfolioProductEndpoint,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['FetchProducts'],
		}),
	}),
});

export const { useLazyFetchProductsQuery, useCreateProductMutation } =
	productApi;
