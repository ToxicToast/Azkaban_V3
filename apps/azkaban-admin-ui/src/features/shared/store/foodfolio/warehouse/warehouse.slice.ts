import { createSlice } from '@reduxjs/toolkit/react';
import { warehouseState } from './warehouse.state';
import { SetSelectedIdAction } from './warehouse.reducer';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { WarehouseModel } from './warehouse.model';
import {
	onFetchWarehousesFulfilled,
	onFetchWarehousesRejected,
} from './warehouse.extraReducer';

export const warehouseSlice = createSlice({
	name: 'foodfolio_warehouse',
	initialState: warehouseState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<WarehouseModel>) => {
		onFetchWarehousesFulfilled(builder);
		onFetchWarehousesRejected(builder);
	},
});

export default warehouseSlice.reducer;
