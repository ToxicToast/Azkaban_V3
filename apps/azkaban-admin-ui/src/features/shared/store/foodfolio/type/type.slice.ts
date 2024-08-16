import { createSlice } from '@reduxjs/toolkit/react';
import { typeState } from './type.state';
import { SetSelectedIdAction } from './type.reducer';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { TypeModel } from './type.model';
import {
	onFetchTypesFulfilled,
	onFetchTypesRejected,
} from './type.extraReducer';

export const typeSlice = createSlice({
	name: 'foodfolio_type',
	initialState: typeState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<TypeModel>) => {
		onFetchTypesFulfilled(builder);
		onFetchTypesRejected(builder);
	},
});

export default typeSlice.reducer;
