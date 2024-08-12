import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { TypeModel } from './type.model';
import { typeApi } from './type.api';
import { FoodFolioType } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchTypesFulfilled(
	builder: ActionReducerMapBuilder<TypeModel>,
) {
	builder.addMatcher(
		typeApi.endpoints?.fetchTypes.matchFulfilled,
		(
			state: Draft<TypeModel>,
			action: PayloadAction<Array<FoodFolioType>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchTypesRejected(
	builder: ActionReducerMapBuilder<TypeModel>,
) {
	builder.addMatcher(typeApi.endpoints?.fetchTypes.matchRejected, () => {
		toastService.sendToast({
			text: 'typeApi.endpoints?.fetchTypes.matchRejected',
			type: 'danger',
		});
	});
}
