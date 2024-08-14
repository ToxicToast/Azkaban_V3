import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectWarehouseData,
	selectWarehouseDataCount,
	selectWarehouseDataLatest,
	selectSelectedWarehouse,
	selectSelectedWarehouseId,
} from './warehouse.selectors';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { warehouseSlice } from './warehouse.slice';
import {
	useCreateWarehouseMutation,
	useLazyFetchWarehousesQuery,
} from './warehouse.api';

export function useWarehouseState() {
	const dispatch = useDispatch();
	// Selectors
	const warehouseData = useAppSelector(selectWarehouseData);
	const warehouseId = useAppSelector(selectSelectedWarehouseId);
	const warehouse = useAppSelector(selectSelectedWarehouse);
	const warehouseCount = useAppSelector(selectWarehouseDataCount);
	const warehouseLatest = useAppSelector(selectWarehouseDataLatest);
	// Api Trigger
	const [fetchWarehousesTrigger] = useLazyFetchWarehousesQuery();
	// Api Mutations
	const [createWarehouseTrigger] = useCreateWarehouseMutation();
	// Actions
	const selectWarehouseId = useCallback(
		(id: Nullable<string>) => {
			dispatch(warehouseSlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		warehouseData,
		warehouseId,
		warehouse,
		warehouseCount,
		warehouseLatest,
		fetchWarehousesTrigger,
		createWarehouseTrigger,
		selectWarehouseId,
	};
}
