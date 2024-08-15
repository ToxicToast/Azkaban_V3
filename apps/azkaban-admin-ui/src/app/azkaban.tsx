import { useEffect } from 'react';
import { useUserState } from '../features/shared/store/user/user.hook';

interface Props {
	isAuthenticated: boolean;
	canSeeAzkaban: boolean;
}

export function Azkaban(props: Props) {
	const { isAuthenticated, canSeeAzkaban } = props;

	const { fetchUserListTrigger } = useUserState();

	useEffect(() => {
		if (isAuthenticated && canSeeAzkaban) {
			fetchUserListTrigger();
		}
	}, [fetchUserListTrigger, canSeeAzkaban, isAuthenticated]);

	return null;
}
