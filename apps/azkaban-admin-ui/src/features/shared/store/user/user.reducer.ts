import { UserModel } from './user.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function SetSelectedIdAction(
	state: UserModel,
	action: PayloadAction<Nullable<string>>,
) {
	state.selectedId = action.payload;
}
