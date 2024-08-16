import { createSlice } from '@reduxjs/toolkit/react';
import { categoryState } from './category.state';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CategoryModel } from './category.model';
import { SetSelectedIdAction } from './category.reducer';
import {
	onFetchCategoriesFulfilled,
	onFetchCategoriesRejected,
} from './category.extraReducer';

export const categorySlice = createSlice({
	name: 'foodfolio_category',
	initialState: categoryState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<CategoryModel>) => {
		onFetchCategoriesFulfilled(builder);
		onFetchCategoriesRejected(builder);
	},
});

export default categorySlice.reducer;
