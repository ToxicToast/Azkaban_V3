import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { WarehouseModel } from './warehouse.model';
import { warehouseApi } from './warehouse.api';
import { FoodFolioWarehouse } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchWarehousesFulfilled(
	builder: ActionReducerMapBuilder<WarehouseModel>,
) {
	builder.addMatcher(
		warehouseApi.endpoints?.fetchWarehouses.matchFulfilled,
		(
			state: Draft<WarehouseModel>,
			action: PayloadAction<Array<FoodFolioWarehouse>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchWarehousesRejected(
	builder: ActionReducerMapBuilder<WarehouseModel>,
) {
	builder.addMatcher(
		warehouseApi.endpoints?.fetchWarehouses.matchRejected,
		() => {
			toastService.sendToast({
				text: 'warehouseApi.endpoints?.fetchWarehouses.matchRejected',
				type: 'danger',
			});
		},
	);
}
