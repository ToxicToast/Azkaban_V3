import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { ProductVariantModel } from './product-variant.model';
import { productVariantApi } from './product-variant.api';
import { FoodFolioItemVariant } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchProductVariantsFulfilled(
	builder: ActionReducerMapBuilder<ProductVariantModel>,
) {
	builder.addMatcher(
		productVariantApi.endpoints?.fetchProductVariants.matchFulfilled,
		(
			state: Draft<ProductVariantModel>,
			action: PayloadAction<Array<FoodFolioItemVariant>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchProductVariantsRejected(
	builder: ActionReducerMapBuilder<ProductVariantModel>,
) {
	builder.addMatcher(
		productVariantApi.endpoints?.fetchProductVariants.matchRejected,
		() => {
			toastService.sendToast({
				text: 'productVariantApi.endpoints?.fetchProductVariants.matchRejected',
				type: 'danger',
			});
		},
	);
}

export function onCreateProductVariantFulfilled(
	builder: ActionReducerMapBuilder<ProductVariantModel>,
) {
	builder.addMatcher(
		productVariantApi.endpoints?.createProductVariant.matchFulfilled,
		() => {
			toastService.sendToast({
				text: 'Product Variant created successfully',
				type: 'success',
			});
		},
	);
}
