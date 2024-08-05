import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { BrandModel } from './brand.model';
import { FoodFolioCompany } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';
import {
	selectCategoryData,
	selectSelectedCategoryId,
} from '../category/category.selectors';

const selectBrand = (state: RootState) => state.foodfolio.brand;

export const selectBrandData = createDraftSafeSelector(
	selectBrand,
	(state: BrandModel) => state.data,
);

export const selectSelectedBrandId = createDraftSafeSelector(
	selectBrand,
	(state: BrandModel) => state.selectedId,
);

export const selectSelectedBrand = createDraftSafeSelector(
	selectCategoryData,
	selectSelectedCategoryId,
	(data: Array<FoodFolioCompany>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((brand) => brand.id === selectedId);
		}
		return null;
	},
);

export const selectBrandDataCount = createDraftSafeSelector(
	selectBrandData,
	(data: Array<FoodFolioCompany>) => data.length,
);

export const selectBrandDataLatest = createDraftSafeSelector(
	selectBrandData,
	(data) => data[data.length - 1],
);
