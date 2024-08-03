import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { CategoryModel } from './category.model';
import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectCategory = (state: RootState) => state.foodfolio.category;

export const selectCategoryData = createDraftSafeSelector(
	selectCategory,
	(state: CategoryModel) => state.data,
);

export const selectSelectedCategoryId = createDraftSafeSelector(
	selectCategory,
	(state: CategoryModel) => state.selectedId,
);

export const selectSelectedCategory = createDraftSafeSelector(
	selectCategoryData,
	selectSelectedCategoryId,
	(data: Array<FoodFolioCategory>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((category) => category.id === selectedId);
		}
		return null;
	},
);

export const selectCategoryDataCount = createDraftSafeSelector(
	selectCategoryData,
	(data) => data.length,
);

export const selectCategoryDataLatest = createDraftSafeSelector(
	selectCategoryData,
	(data) => data[data.length - 1],
);

export const selectCategoryDataWithoutSelected = createDraftSafeSelector(
	selectCategoryData,
	selectSelectedCategoryId,
	(data: Array<FoodFolioCategory>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.filter((category) => category.id !== selectedId);
		}
		return data;
	},
);
