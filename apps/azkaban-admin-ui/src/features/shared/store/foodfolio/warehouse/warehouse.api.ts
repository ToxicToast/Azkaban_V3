import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import {
	CreateFoodFolioWarehouse,
	FoodFolioWarehouse,
} from '@toxictoast/azkaban-sdk';
import { foodfolioWarehouseEndpoint } from '../../../../../config/endpoints';

export const warehouseApi = createApi({
	reducerPath: 'warehouseApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchWarehouses'],
	endpoints: (builder) => ({
		fetchWarehouses: builder.query<Array<FoodFolioWarehouse>, void>({
			query: () => ({
				url: foodfolioWarehouseEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchWarehouses'],
		}),

		createWarehouse: builder.mutation<void, CreateFoodFolioWarehouse>({
			query: (data) => ({
				url: foodfolioWarehouseEndpoint,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['FetchWarehouses'],
		}),
	}),
});

export const { useLazyFetchWarehousesQuery, useCreateWarehouseMutation } =
	warehouseApi;
