import { useAppSelector } from '../store';
import { useLazyFetchUserListQuery } from './user.api';
import {
	selectUserData,
	selectUserDataCount,
	selectUserDataLatest,
	selectUserSelected,
} from './user.selector';

export function useUserState() {
	const [fetchUserListTrigger] = useLazyFetchUserListQuery();

	const data = useAppSelector(selectUserData);
	const dataCount = useAppSelector(selectUserDataCount);
	const selectedUser = useAppSelector(selectUserSelected);
	const latestUser = useAppSelector(selectUserDataLatest);

	return {
		fetchUserListTrigger,
		data,
		dataCount,
		latestUser,
		selectedUser,
	};
}
