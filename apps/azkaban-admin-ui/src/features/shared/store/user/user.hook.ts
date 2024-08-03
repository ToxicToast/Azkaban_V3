import { useAppSelector } from '../store';
import { useLazyFetchUserListQuery } from './user.api';
import {
	selectSelectedUser,
	selectUserData,
	selectUserDataCount,
	selectUserDataLatest,
	selectSelectedUserId,
} from './user.selector';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { userSlice } from './user.slice';
import { Nullable } from '@toxictoast/azkaban-base-types';

export function useUserState() {
	const dispatch = useDispatch();
	// Selectors
	const data = useAppSelector(selectUserData);
	const dataCount = useAppSelector(selectUserDataCount);
	const selectedId = useAppSelector(selectSelectedUserId);
	const selectedUser = useAppSelector(selectSelectedUser);
	const latestUser = useAppSelector(selectUserDataLatest);
	// Api Trigger
	const [fetchUserListTrigger] = useLazyFetchUserListQuery();
	// Actions
	const selectUserId = useCallback(
		(id: Nullable<string>) => dispatch(userSlice.actions.setSelectedId(id)),
		[dispatch],
	);

	return {
		data,
		dataCount,
		selectedId,
		selectedUser,
		latestUser,
		fetchUserListTrigger,
		selectUserId,
	};
}
