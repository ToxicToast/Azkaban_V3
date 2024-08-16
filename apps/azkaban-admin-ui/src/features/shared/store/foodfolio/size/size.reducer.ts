import { SizeModel } from './size.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: SizeModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
