import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import {
	CreateFoodFolioLocation,
	FoodFolioLocation,
} from '@toxictoast/azkaban-sdk';
import { foodfolioLocationEndpoint } from '../../../../../config/endpoints';

export const locationApi = createApi({
	reducerPath: 'locationApi',
	baseQuery: dynamicBaseQuery,
	tagTypes: ['FetchLocations'],
	endpoints: (builder) => ({
		fetchLocations: builder.query<Array<FoodFolioLocation>, void>({
			query: () => ({
				url: foodfolioLocationEndpoint,
				method: 'GET',
			}),
			providesTags: ['FetchLocations'],
		}),

		createLocation: builder.mutation<void, CreateFoodFolioLocation>({
			query: (data) => ({
				url: foodfolioLocationEndpoint,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['FetchLocations'],
		}),
	}),
});

export const { useLazyFetchLocationsQuery, useCreateLocationMutation } =
	locationApi;
