import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../../dynamicBaseQuery';
import { FoodFolioLocation } from '@toxictoast/azkaban-sdk';
import { foodfolioLocationEndpoint } from '../../../../../config/endpoints';
import { Nullable } from '@toxictoast/azkaban-base-types';

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

		createLocation: builder.mutation<
			void,
			{ title: string; parent_id: Nullable<string>; freezer: string }
		>({
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
