import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectCategoryData,
	selectCategoryDataCount,
	selectCategoryDataLatest,
	selectCategoryDataWithoutSelected,
	selectSelectedCategory,
	selectSelectedCategoryId,
} from './category.selectors';
import { useLazyFetchCategoriesQuery } from './category.api';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { categorySlice } from './category.slice';

export function useCategoryState() {
	const dispatch = useDispatch();
	// Selectors
	const categoryData = useAppSelector(selectCategoryData);
	const categoryId = useAppSelector(selectSelectedCategoryId);
	const category = useAppSelector(selectSelectedCategory);
	const categoryCount = useAppSelector(selectCategoryDataCount);
	const categoryLatest = useAppSelector(selectCategoryDataLatest);
	const categoryDropdown = useAppSelector(selectCategoryDataWithoutSelected);
	// Api Trigger
	const [fetchCategoriesTrigger] = useLazyFetchCategoriesQuery();
	// Actions
	const selectCategoryId = useCallback(
		(id: Nullable<string>) => {
			dispatch(categorySlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		categoryData,
		categoryId,
		category,
		categoryCount,
		categoryLatest,
		categoryDropdown,
		fetchCategoriesTrigger,
		selectCategoryId,
	};
}
