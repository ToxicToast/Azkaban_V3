import { Stats } from '../components';
import { Group, Notebook, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserState } from '../../shared/store/user/user.hook';
import { usersRoute } from '../../../config/routes';

export function AzkabanStats() {
	const { dataCount: userDataCount } = useUserState();

	return (
		<>
			<Stats
				title="Total Azkaban Notifications"
				icon={<Notebook className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>

			<Link to={usersRoute}>
				<Stats
					title="Total Azkaban Users"
					icon={<Users className="h-4 w-4 text-muted-foreground" />}
					statistic={String(userDataCount)}
				/>
			</Link>

			<Stats
				title="Total Azkaban Groups"
				icon={<Group className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
		</>
	);
}
