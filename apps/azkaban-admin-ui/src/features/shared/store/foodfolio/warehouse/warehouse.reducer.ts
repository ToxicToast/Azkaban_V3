import { WarehouseModel } from './warehouse.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: WarehouseModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
