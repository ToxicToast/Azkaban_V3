import { createSlice } from '@reduxjs/toolkit/react';
import { productDetailState } from './product-detail.state';
import { SetSelectedIdAction } from './product-detail.reducer';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ProductDetailModel } from './product-detail.model';
import {
	onCreateProductDetailFulfilled,
	onFetchProductDetailsFulfilled,
	onFetchProductDetailsRejected,
} from './product-detail.extraReducer';

export const productDetailSlice = createSlice({
	name: 'foodfolio_product_detail',
	initialState: productDetailState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<ProductDetailModel>) => {
		onCreateProductDetailFulfilled(builder);
		onFetchProductDetailsFulfilled(builder);
		onFetchProductDetailsRejected(builder);
	},
});

export default productDetailSlice.reducer;
