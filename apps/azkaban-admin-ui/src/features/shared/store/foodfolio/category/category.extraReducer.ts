import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { CategoryModel } from './category.model';
import { categoryApi } from './category.api';
import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { toastService } from '../../../service';

export function onFetchCategoriesFulfilled(
	builder: ActionReducerMapBuilder<CategoryModel>,
) {
	builder.addMatcher(
		categoryApi.endpoints?.fetchCategories.matchFulfilled,
		(
			state: Draft<CategoryModel>,
			action: PayloadAction<Array<FoodFolioCategory>>,
		) => {
			state.data = action.payload;
		},
	);
}

export function onFetchCategoriesRejected(
	builder: ActionReducerMapBuilder<CategoryModel>,
) {
	builder.addMatcher(
		categoryApi.endpoints?.fetchCategories.matchRejected,
		(state: Draft<CategoryModel>) => {
			toastService.sendToast({
				text: 'categoryApi.endpoints.fetchCategories.matchRejected',
				type: 'danger',
			});
		},
	);
}
