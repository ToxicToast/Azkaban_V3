import { CategoryModel } from './category.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: CategoryModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
