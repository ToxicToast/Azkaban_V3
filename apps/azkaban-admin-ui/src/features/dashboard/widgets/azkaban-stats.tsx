import { Stats } from '../components';
import { Group, Notebook, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserState } from '../../shared/store/user/user.hook';
import {
	groupsRoute,
	notificationsRoute,
	usersRoute,
} from '../../../config/routes';

export function AzkabanStats() {
	const { dataCount: userDataCount } = useUserState();

	return (
		<>
			<Link to={notificationsRoute}>
				<Stats
					title="Total Azkaban Notifications"
					icon={
						<Notebook className="h-4 w-4 text-muted-foreground" />
					}
					statistic="0"
				/>
			</Link>

			<Link to={usersRoute}>
				<Stats
					title="Total Azkaban Users"
					icon={<Users className="h-4 w-4 text-muted-foreground" />}
					statistic={String(userDataCount)}
				/>
			</Link>

			<Link to={groupsRoute}>
				<Stats
					title="Total Azkaban Groups"
					icon={<Group className="h-4 w-4 text-muted-foreground" />}
					statistic="0"
				/>
			</Link>
		</>
	);
}
