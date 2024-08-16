import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { TypeModel } from './type.model';
import { FoodFolioType } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectType = (state: RootState) => state.foodfolio.type;

export const selectTypeData = createDraftSafeSelector(
	selectType,
	(state: TypeModel) => state.data,
);

export const selectSelectedTypeId = createDraftSafeSelector(
	selectType,
	(state: TypeModel) => state.selectedId,
);

export const selectSelectedType = createDraftSafeSelector(
	selectTypeData,
	selectSelectedTypeId,
	(data: Array<FoodFolioType>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((brand) => brand.id === selectedId);
		}
		return null;
	},
);

export const selectTypeDataCount = createDraftSafeSelector(
	selectTypeData,
	(data: Array<FoodFolioType>) => data.length,
);

export const selectTypeDataLatest = createDraftSafeSelector(
	selectTypeData,
	(data) => data[data.length - 1],
);
