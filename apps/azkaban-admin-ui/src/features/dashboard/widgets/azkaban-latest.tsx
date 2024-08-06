import { Stats } from '../components';
import { Group, Notebook } from 'lucide-react';
import { LatestUser } from '../atoms/azkaban/latest-user.atom';

export function AzkabanLatest() {
	return (
		<>
			<Stats
				title="Latest Azkaban Notification"
				icon={<Notebook className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>

			<LatestUser />

			<Stats
				title="Latest Azkaban Group"
				icon={<Group className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
		</>
	);
}
