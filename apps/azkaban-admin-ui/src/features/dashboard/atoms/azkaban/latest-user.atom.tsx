import { useMemo } from 'react';
import { viewUsersRoute, usersRoute } from '../../../../config/routes';
import { useUserState } from '../../../shared/store/user/user.hook';
import { Stats } from '../../components';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LatestUser() {
	const { latestUser, selectUserId } = useUserState();

	const getUserId = useMemo(() => {
		return latestUser?.id ?? '0';
	}, [latestUser?.id]);

	const getUserName = useMemo(() => {
		return latestUser?.username ?? 'No User :(';
	}, [latestUser?.username]);

	const getUserLink = useMemo(() => {
		const userId = latestUser?.id ?? null;
		if (userId !== null) {
			return viewUsersRoute;
		}
		return usersRoute;
	}, [latestUser?.id]);

	return (
		<Link to={getUserLink} onClick={() => selectUserId(getUserId)}>
			<Stats
				title="Latest Azkaban User"
				icon={<Users className="h-4 w-4 text-muted-foreground" />}
				statistic={getUserName}
			/>
		</Link>
	);
}
