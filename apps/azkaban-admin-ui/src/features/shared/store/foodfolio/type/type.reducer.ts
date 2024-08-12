import { TypeModel } from './type.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: TypeModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
