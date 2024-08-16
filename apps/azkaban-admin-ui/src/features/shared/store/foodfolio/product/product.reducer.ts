import { ProductModel } from './product.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: ProductModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
