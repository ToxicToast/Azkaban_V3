import { createSlice } from '@reduxjs/toolkit/react';
import { productState } from './product.state';
import { SetSelectedIdAction } from './product.reducer';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ProductModel } from './product.model';
import {
	onCreateProductFulfilled,
	onFetchProductsFulfilled,
	onFetchProductsRejected,
} from './product.extraReducer';

export const productSlice = createSlice({
	name: 'foodfolio_product',
	initialState: productState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<ProductModel>) => {
		onFetchProductsFulfilled(builder);
		onFetchProductsRejected(builder);
		onCreateProductFulfilled(builder);
	},
});

export default productSlice.reducer;
