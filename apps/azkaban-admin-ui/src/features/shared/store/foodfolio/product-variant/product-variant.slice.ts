import { createSlice } from '@reduxjs/toolkit/react';
import { productVariantState } from './product-variant.state';
import { SetSelectedIdAction } from './product-variant.reducer';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ProductVariantModel } from './product-variant.model';
import {
	onCreateProductVariantFulfilled,
	onFetchProductVariantsFulfilled,
	onFetchProductVariantsRejected,
} from './product-variant.extraReducer';

export const productVariantSlice = createSlice({
	name: 'foodfolio_product_variant',
	initialState: productVariantState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<ProductVariantModel>) => {
		onFetchProductVariantsFulfilled(builder);
		onFetchProductVariantsRejected(builder);
		onCreateProductVariantFulfilled(builder);
	},
});

export default productVariantSlice.reducer;
