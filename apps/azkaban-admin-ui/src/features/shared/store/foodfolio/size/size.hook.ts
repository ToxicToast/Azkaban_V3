import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectSizeData,
	selectSizeDataCount,
	selectSizeDataLatest,
	selectSelectedSize,
	selectSelectedSizeId,
} from './size.selectors';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { sizeSlice } from './size.slice';
import { useCreateSizeMutation, useLazyFetchSizesQuery } from './size.api';

export function useSizeState() {
	const dispatch = useDispatch();
	// Selectors
	const sizeData = useAppSelector(selectSizeData);
	const sizeId = useAppSelector(selectSelectedSizeId);
	const size = useAppSelector(selectSelectedSize);
	const sizeCount = useAppSelector(selectSizeDataCount);
	const sizeLatest = useAppSelector(selectSizeDataLatest);
	// Api Trigger
	const [fetchSizesTrigger] = useLazyFetchSizesQuery();
	// Api Mutations
	const [createSizeTrigger] = useCreateSizeMutation();
	// Actions
	const selectSizeId = useCallback(
		(id: Nullable<string>) => {
			dispatch(sizeSlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		sizeData,
		sizeId,
		size,
		sizeCount,
		sizeLatest,
		fetchSizesTrigger,
		createSizeTrigger,
		selectSizeId,
	};
}
