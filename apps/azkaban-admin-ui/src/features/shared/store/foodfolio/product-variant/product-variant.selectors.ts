import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { ProductVariantModel } from './product-variant.model';
import { FoodFolioItemVariant } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectProductVariant = (state: RootState) =>
	state.foodfolio.productVariant;

export const selectProductVariantData = createDraftSafeSelector(
	selectProductVariant,
	(state: ProductVariantModel) => state.data,
);

export const selectSelectedProductVariantId = createDraftSafeSelector(
	selectProductVariant,
	(state: ProductVariantModel) => state.selectedId,
);

export const selectSelectedProductVariant = createDraftSafeSelector(
	selectProductVariantData,
	selectSelectedProductVariantId,
	(data: Array<FoodFolioItemVariant>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((brand) => brand.id === selectedId);
		}
		return null;
	},
);

export const selectProductVariantDataCount = createDraftSafeSelector(
	selectProductVariantData,
	(data: Array<FoodFolioItemVariant>) => data.length,
);

export const selectProductVariantDataLatest = createDraftSafeSelector(
	selectProductVariantData,
	(data) => data[data.length - 1],
);
