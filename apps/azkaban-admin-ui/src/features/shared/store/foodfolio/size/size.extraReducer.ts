import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { SizeModel } from './size.model';
import { sizeApi } from './size.api';
import { FoodFolioSize } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchSizesFulfilled(
	builder: ActionReducerMapBuilder<SizeModel>,
) {
	builder.addMatcher(
		sizeApi.endpoints?.fetchSizes.matchFulfilled,
		(
			state: Draft<SizeModel>,
			action: PayloadAction<Array<FoodFolioSize>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchSizesRejected(
	builder: ActionReducerMapBuilder<SizeModel>,
) {
	builder.addMatcher(sizeApi.endpoints?.fetchSizes.matchRejected, () => {
		toastService.sendToast({
			text: 'locationApi.endpoints?.fetchSizes.matchRejected',
			type: 'danger',
		});
	});
}
