import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectTypeData,
	selectTypeDataCount,
	selectTypeDataLatest,
	selectSelectedType,
	selectSelectedTypeId,
} from './type.selectors';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { typeSlice } from './type.slice';
import { useCreateTypeMutation, useLazyFetchTypesQuery } from './type.api';

export function useTypeState() {
	const dispatch = useDispatch();
	// Selectors
	const typeData = useAppSelector(selectTypeData);
	const typeId = useAppSelector(selectSelectedTypeId);
	const type = useAppSelector(selectSelectedType);
	const typeCount = useAppSelector(selectTypeDataCount);
	const typeLatest = useAppSelector(selectTypeDataLatest);
	// Api Trigger
	const [fetchTypesTrigger] = useLazyFetchTypesQuery();
	// Api Mutations
	const [createTypeTrigger] = useCreateTypeMutation();
	// Actions
	const selectTypeId = useCallback(
		(id: Nullable<string>) => {
			dispatch(typeSlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		typeData,
		typeId,
		type,
		typeCount,
		typeLatest,
		fetchTypesTrigger,
		createTypeTrigger,
		selectTypeId,
	};
}
