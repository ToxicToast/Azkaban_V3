import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { ProductModel } from './product.model';
import { productApi } from './product.api';
import { FoodFolioItem } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchProductsFulfilled(
	builder: ActionReducerMapBuilder<ProductModel>,
) {
	builder.addMatcher(
		productApi.endpoints?.fetchProducts.matchFulfilled,
		(
			state: Draft<ProductModel>,
			action: PayloadAction<Array<FoodFolioItem>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchProductsRejected(
	builder: ActionReducerMapBuilder<ProductModel>,
) {
	builder.addMatcher(
		productApi.endpoints?.fetchProducts.matchRejected,
		() => {
			toastService.sendToast({
				text: 'productApi.endpoints?.fetchProducts.matchRejected',
				type: 'danger',
			});
		},
	);
}

export function onCreateProductFulfilled(
	builder: ActionReducerMapBuilder<ProductModel>,
) {
	builder.addMatcher(
		productApi.endpoints?.createProduct.matchFulfilled,
		() => {
			toastService.sendToast({
				text: 'Product created successfully',
				type: 'success',
			});
		},
	);
}
