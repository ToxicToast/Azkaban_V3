import { useUserState } from '../features/shared/store/user/user.hook';
import { useEffect } from 'react';

interface Props {
	isAuthenticated: boolean;
}

export function Foodfolio(props: Props) {
	const { isAuthenticated } = props;

	const { fetchUserListTrigger } = useUserState();

	useEffect(() => {
		if (isAuthenticated) {
			fetchUserListTrigger();
		}
	}, [fetchUserListTrigger, isAuthenticated]);

	return null;
}
