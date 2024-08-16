import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import {
	CreateFoodFolioItemDetail,
	FoodFolioItemDetail,
} from '@toxictoast/azkaban-sdk';
import { foodfolioProductDetailEndpoint } from '../../../../../config/endpoints';

export const productDetailApi = createApi({
	reducerPath: 'productDetailsApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchProductDetails'],
	endpoints: (builder) => ({
		fetchProductDetails: builder.query<Array<FoodFolioItemDetail>, void>({
			query: () => ({
				url: foodfolioProductDetailEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchProductDetails'],
		}),

		createProductDetail: builder.mutation<void, CreateFoodFolioItemDetail>({
			query: (data) => ({
				url: foodfolioProductDetailEndpoint,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['FetchProductDetails'],
		}),
	}),
});

export const {
	useLazyFetchProductDetailsQuery,
	useCreateProductDetailMutation,
} = productDetailApi;
