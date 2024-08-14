import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { ProductModel } from './product.model';
import { FoodFolioItem } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectProduct = (state: RootState) => state.foodfolio.product;

export const selectProductData = createDraftSafeSelector(
	selectProduct,
	(state: ProductModel) => state.data,
);

export const selectSelectedProductId = createDraftSafeSelector(
	selectProduct,
	(state: ProductModel) => state.selectedId,
);

export const selectSelectedProduct = createDraftSafeSelector(
	selectProductData,
	selectSelectedProductId,
	(data: Array<FoodFolioItem>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((brand) => brand.id === selectedId);
		}
		return null;
	},
);

export const selectProductDataCount = createDraftSafeSelector(
	selectProductData,
	(data: Array<FoodFolioItem>) => data.length,
);

export const selectProductDataLatest = createDraftSafeSelector(
	selectProductData,
	(data) => data[data.length - 1],
);
