import { Stats } from '../../components';
import { Cross1Icon } from '@radix-ui/react-icons';

export function LatestGroup() {
	return (
		<Stats
			title="Latest Azkaban Group"
			icon={<Cross1Icon className="h-4 w-4 text-muted-foreground" />}
			statistic="Not Available"
			isDisabled={true}
		/>
	);
}
