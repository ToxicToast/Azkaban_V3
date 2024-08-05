import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectBrandData,
	selectBrandDataCount,
	selectBrandDataLatest,
	selectSelectedBrand,
	selectSelectedBrandId,
} from './brand.selectors';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { brandSlice } from './brand.slice';
import { useLazyFetchBrandsQuery } from './brand.api';

export function useBrandState() {
	const dispatch = useDispatch();
	// Selectors
	const brandData = useAppSelector(selectBrandData);
	const brandId = useAppSelector(selectSelectedBrandId);
	const brand = useAppSelector(selectSelectedBrand);
	const brandCount = useAppSelector(selectBrandDataCount);
	const brandLatest = useAppSelector(selectBrandDataLatest);
	// Api Trigger
	const [fetchBrandsTrigger] = useLazyFetchBrandsQuery();
	// Actions
	const selectBrandId = useCallback(
		(id: Nullable<string>) => {
			dispatch(brandSlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		brandData,
		brandId,
		brand,
		brandCount,
		brandLatest,
		fetchBrandsTrigger,
		selectBrandId,
	};
}
