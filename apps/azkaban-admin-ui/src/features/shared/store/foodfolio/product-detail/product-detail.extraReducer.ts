import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { ProductDetailModel } from './product-detail.model';
import { productDetailApi } from './product-detail.api';
import { FoodFolioItemDetail } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchProductDetailsFulfilled(
	builder: ActionReducerMapBuilder<ProductDetailModel>,
) {
	builder.addMatcher(
		productDetailApi.endpoints?.fetchProductDetails.matchFulfilled,
		(
			state: Draft<ProductDetailModel>,
			action: PayloadAction<Array<FoodFolioItemDetail>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchProductDetailsRejected(
	builder: ActionReducerMapBuilder<ProductDetailModel>,
) {
	builder.addMatcher(
		productDetailApi.endpoints?.fetchProductDetails.matchRejected,
		() => {
			toastService.sendToast({
				text: 'productApi.endpoints?.fetchProductDetails.matchRejected',
				type: 'danger',
			});
		},
	);
}

export function onCreateProductDetailFulfilled(
	builder: ActionReducerMapBuilder<ProductDetailModel>,
) {
	builder.addMatcher(
		productDetailApi.endpoints?.createProductDetail.matchFulfilled,
		() => {
			toastService.sendToast({
				text: 'Product Detail created successfully',
				type: 'success',
			});
		},
	);
}
