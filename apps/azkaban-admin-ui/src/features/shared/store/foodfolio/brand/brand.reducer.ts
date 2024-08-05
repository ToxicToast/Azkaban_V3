import { BrandModel } from './brand.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: BrandModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
