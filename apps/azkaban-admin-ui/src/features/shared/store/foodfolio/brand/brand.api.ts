import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import { FoodFolioCompany } from '@toxictoast/azkaban-sdk';
import { foodfolioCompanyEndpoint } from '../../../../../config/endpoints';

export const brandApi = createApi({
	reducerPath: 'brandApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchBrands'],
	endpoints: (builder) => ({
		fetchBrands: builder.query<Array<FoodFolioCompany>, void>({
			query: () => ({
				url: foodfolioCompanyEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchBrands'],
		}),
	}),
});

export const { useLazyFetchBrandsQuery } = brandApi;
