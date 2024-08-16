import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { LocationModel } from './location.model';
import { locationApi } from './location.api';
import { FoodFolioLocation } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchLocationsFulfilled(
	builder: ActionReducerMapBuilder<LocationModel>,
) {
	builder.addMatcher(
		locationApi.endpoints?.fetchLocations.matchFulfilled,
		(
			state: Draft<LocationModel>,
			action: PayloadAction<Array<FoodFolioLocation>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchLocationsRejected(
	builder: ActionReducerMapBuilder<LocationModel>,
) {
	builder.addMatcher(
		locationApi.endpoints?.fetchLocations.matchRejected,
		() => {
			toastService.sendToast({
				text: 'locationApi.endpoints?.fetchLocations.matchRejected',
				type: 'danger',
			});
		},
	);
}
