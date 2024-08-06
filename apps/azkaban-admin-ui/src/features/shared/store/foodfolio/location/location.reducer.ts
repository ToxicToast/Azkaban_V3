import { LocationModel } from './location.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: LocationModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
