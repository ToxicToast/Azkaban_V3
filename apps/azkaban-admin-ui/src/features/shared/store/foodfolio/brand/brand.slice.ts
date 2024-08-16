import { createSlice } from '@reduxjs/toolkit/react';
import { brandState } from './brand.state';
import { SetSelectedIdAction } from './brand.reducer';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BrandModel } from './brand.model';
import {
	onFetchBrandsFulfilled,
	onFetchBrandsRejected,
} from './brand.extraReducer';

export const brandSlice = createSlice({
	name: 'foodfolio_brand',
	initialState: brandState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<BrandModel>) => {
		onFetchBrandsFulfilled(builder);
		onFetchBrandsRejected(builder);
	},
});

export default brandSlice.reducer;
