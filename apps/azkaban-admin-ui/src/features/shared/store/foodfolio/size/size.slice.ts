import { createSlice } from '@reduxjs/toolkit/react';
import { sizeState } from './size.state';
import { SetSelectedIdAction } from './size.reducer';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { SizeModel } from './size.model';
import {
	onFetchSizesFulfilled,
	onFetchSizesRejected,
} from './size.extraReducer';

export const sizeSlice = createSlice({
	name: 'foodfolio_size',
	initialState: sizeState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<SizeModel>) => {
		onFetchSizesFulfilled(builder);
		onFetchSizesRejected(builder);
	},
});

export default sizeSlice.reducer;
