import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { SizeModel } from './size.model';
import { FoodFolioSize } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectSize = (state: RootState) => state.foodfolio.size;

export const selectSizeData = createDraftSafeSelector(
	selectSize,
	(state: SizeModel) => state.data,
);

export const selectSelectedSizeId = createDraftSafeSelector(
	selectSize,
	(state: SizeModel) => state.selectedId,
);

export const selectSelectedSize = createDraftSafeSelector(
	selectSizeData,
	selectSelectedSizeId,
	(data: Array<FoodFolioSize>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((brand) => brand.id === selectedId);
		}
		return null;
	},
);

export const selectSizeDataCount = createDraftSafeSelector(
	selectSizeData,
	(data: Array<FoodFolioSize>) => data.length,
);

export const selectSizeDataLatest = createDraftSafeSelector(
	selectSizeData,
	(data) => data[data.length - 1],
);
