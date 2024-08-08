import { Stats } from '../components';
import { Group, Notebook } from 'lucide-react';
import { useUserState } from '../../shared/store/user/user.hook';
import { StatsUser } from '../atoms/azkaban/stats-user.atom';

export function AzkabanStats() {
	return (
		<>
			<Stats
				title="Total Azkaban Notifications"
				icon={<Notebook className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>

			<StatsUser />

			<Stats
				title="Total Azkaban Groups"
				icon={<Group className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
		</>
	);
}
