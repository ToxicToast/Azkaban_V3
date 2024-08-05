import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { BrandModel } from './brand.model';
import { brandApi } from './brand.api';
import { FoodFolioCompany } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchBrandsFulfilled(
	builder: ActionReducerMapBuilder<BrandModel>,
) {
	builder.addMatcher(
		brandApi.endpoints?.fetchBrands.matchFulfilled,
		(
			state: Draft<BrandModel>,
			action: PayloadAction<Array<FoodFolioCompany>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchBrandsRejected(
	builder: ActionReducerMapBuilder<BrandModel>,
) {
	builder.addMatcher(brandApi.endpoints?.fetchBrands.matchRejected, () => {
		toastService.sendToast({
			text: 'brandApi.endpoints?.fetchBrands.matchRejected',
			type: 'danger',
		});
	});
}
