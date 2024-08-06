import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { LocationModel } from './location.model';
import { FoodFolioLocation } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectLocation = (state: RootState) => state.foodfolio.location;

export const selectLocationData = createDraftSafeSelector(
	selectLocation,
	(state: LocationModel) => state.data,
);

export const selectSelectedLocationId = createDraftSafeSelector(
	selectLocation,
	(state: LocationModel) => state.selectedId,
);

export const selectSelectedLocation = createDraftSafeSelector(
	selectLocationData,
	selectSelectedLocationId,
	(data: Array<FoodFolioLocation>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((brand) => brand.id === selectedId);
		}
		return null;
	},
);

export const selectLocationDataCount = createDraftSafeSelector(
	selectLocationData,
	(data: Array<FoodFolioLocation>) => data.length,
);

export const selectLocationDataLatest = createDraftSafeSelector(
	selectLocationData,
	(data) => data[data.length - 1],
);
