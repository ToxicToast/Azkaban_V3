import { RootState } from '../../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { WarehouseModel } from './warehouse.model';
import { FoodFolioWarehouse } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectWarehouse = (state: RootState) => state.foodfolio.warehouse;

export const selectWarehouseData = createDraftSafeSelector(
	selectWarehouse,
	(state: WarehouseModel) => state.data,
);

export const selectSelectedWarehouseId = createDraftSafeSelector(
	selectWarehouse,
	(state: WarehouseModel) => state.selectedId,
);

export const selectSelectedWarehouse = createDraftSafeSelector(
	selectWarehouseData,
	selectSelectedWarehouseId,
	(data: Array<FoodFolioWarehouse>, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return data.find((brand) => brand.id === selectedId);
		}
		return null;
	},
);

export const selectWarehouseDataCount = createDraftSafeSelector(
	selectWarehouseData,
	(data: Array<FoodFolioWarehouse>) => data.length,
);

export const selectWarehouseDataLatest = createDraftSafeSelector(
	selectWarehouseData,
	(data) => data[data.length - 1],
);
