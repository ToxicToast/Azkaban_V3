import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import {
	CreateFoodFolioItemVariant,
	FoodFolioItemVariant,
} from '@toxictoast/azkaban-sdk';
import { foodfolioProductVariantEndpoint } from '../../../../../config/endpoints';

export const productVariantApi = createApi({
	reducerPath: 'productVariantApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchProductVariants'],
	endpoints: (builder) => ({
		fetchProductVariants: builder.query<Array<FoodFolioItemVariant>, void>({
			query: () => ({
				url: foodfolioProductVariantEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchProductVariants'],
		}),

		createProductVariant: builder.mutation<
			void,
			CreateFoodFolioItemVariant
		>({
			query: (data) => ({
				url: foodfolioProductVariantEndpoint,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['FetchProductVariants'],
		}),
	}),
});

export const {
	useLazyFetchProductVariantsQuery,
	useCreateProductVariantMutation,
} = productVariantApi;
