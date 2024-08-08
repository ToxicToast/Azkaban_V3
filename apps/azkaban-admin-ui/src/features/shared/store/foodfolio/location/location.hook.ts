import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectLocationData,
	selectLocationDataCount,
	selectLocationDataLatest,
	selectSelectedLocation,
	selectSelectedLocationId,
} from './location.selectors';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { locationSlice } from './location.slice';
import {
	useCreateLocationMutation,
	useLazyFetchLocationsQuery,
} from './location.api';

export function useLocationState() {
	const dispatch = useDispatch();
	// Selectors
	const locationData = useAppSelector(selectLocationData);
	const locationId = useAppSelector(selectSelectedLocationId);
	const location = useAppSelector(selectSelectedLocation);
	const locationCount = useAppSelector(selectLocationDataCount);
	const locationLatest = useAppSelector(selectLocationDataLatest);
	// Api Trigger
	const [fetchLocationsTrigger] = useLazyFetchLocationsQuery();
	// Api Mutations
	const [createLocationTrigger] = useCreateLocationMutation();
	// Actions
	const selectLocationId = useCallback(
		(id: Nullable<string>) => {
			dispatch(locationSlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		locationData,
		locationId,
		location,
		locationCount,
		locationLatest,
		fetchLocationsTrigger,
		createLocationTrigger,
		selectLocationId,
	};
}
