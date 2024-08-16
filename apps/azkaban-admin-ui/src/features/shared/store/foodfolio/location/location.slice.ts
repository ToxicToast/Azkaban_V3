import { createSlice } from '@reduxjs/toolkit/react';
import { locationState } from './location.state';
import { SetSelectedIdAction } from './location.reducer';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { LocationModel } from './location.model';
import {
	onFetchLocationsFulfilled,
	onFetchLocationsRejected,
} from './location.extraReducer';

export const locationSlice = createSlice({
	name: 'foodfolio_location',
	initialState: locationState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<LocationModel>) => {
		onFetchLocationsFulfilled(builder);
		onFetchLocationsRejected(builder);
	},
});

export default locationSlice.reducer;
