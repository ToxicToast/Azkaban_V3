import { StatsUser } from '../atoms/azkaban/stats-user.atom';
import { StatsNotification } from '../atoms/azkaban/stats-notification.atom';
import { StatsGroup } from '../atoms/azkaban/stats-group.atom';

export function AzkabanStats() {
	return (
		<>
			<StatsNotification />
			<StatsUser />
			<StatsGroup />
		</>
	);
}
