import { StatsUser } from '../atoms/azkaban/stats-user.atom';

export function AzkabanStats() {
	return (
		<>
			<div>{/* TODO: TOTAL NOTIFICATIONS */}</div>
			<StatsUser />
			<div>{/* TODO: TOTAL GROUPS */}</div>
		</>
	);
}
