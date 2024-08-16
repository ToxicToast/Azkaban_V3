import { ProductVariantModel } from './product-variant.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: ProductVariantModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
