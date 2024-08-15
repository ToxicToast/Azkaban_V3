import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { ProductDetailModel } from './product-detail.model';
import { FoodFolioItemDetail } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectProductDetail = (state: RootState) => state.foodfolio.productDetail;

export const selectProductDetailData = createDraftSafeSelector(
	selectProductDetail,
	(state: ProductDetailModel) => state.data,
);

export const selectSelectedProductDetailId = createDraftSafeSelector(
	selectProductDetail,
	(state: ProductDetailModel) => state.selectedId,
);

export const selectSelectedProductDetail = createDraftSafeSelector(
	selectProductDetailData,
	selectSelectedProductDetailId,
	(data: Array<FoodFolioItemDetail>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((detail) => detail.id === selectedId);
		}
		return null;
	},
);

export const selectProductDetailDataCount = createDraftSafeSelector(
	selectProductDetailData,
	(data: Array<FoodFolioItemDetail>) => data.length,
);

export const selectProductDetailDataLatest = createDraftSafeSelector(
	selectProductDetailData,
	(data) => data[data.length - 1],
);
