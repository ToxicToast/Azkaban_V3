import { ProductDetailModel } from './product-detail.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: ProductDetailModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
